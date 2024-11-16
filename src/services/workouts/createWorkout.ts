import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';

import pool from '../../config/db';
import { CreateWorkoutPlanRequest, CreateWorkoutPlanResponse } from '../../models';

export const createWorkout = async (request: CreateWorkoutPlanRequest) => {
  
  const connection = await pool.getConnection();

  const res = await connection.query('SELECT * FROM workoutPlan WHERE title = ?', [request.name]);
  if (res[0]) {
    throw createHttpError(400, `Ya existe un plan de entrenamiento con ese nombre`); 
  }
  await connection.beginTransaction();

  const { name, initDate, workouts, customersId, duration, endDate, objective } = request;
  try {
    // Insert into `workoutPlan`
    const workoutPlanId = uuidv4();

    const insertWorkoutPlanQuery = 'INSERT INTO workoutPlan (id, title, objective, duration, init_date) VALUES (?, ?, ?, ?, ?)'
    await connection.query(insertWorkoutPlanQuery, [workoutPlanId, name, objective, duration, initDate]);

    // Insert into `userWorkoutsPlan`
    customersId?.forEach(async customerId => {
      const insertUserWorkoutPlanQuery = 'INSERT INTO userWorkoutPlan (id, userId, workoutPlanId) VALUES (?, ?, ?)'
      await connection.query(insertUserWorkoutPlanQuery, [uuidv4(), customerId, workoutPlanId]);
    });

    // Insert into `workout`
    workouts.forEach(async (workout) => {
      const workoutId = uuidv4();
      const { week, day, description, exercises } = workout;

      const insertWorkoutQuery = 'INSERT INTO workout (id, planId, week, day, description) VALUES (?, ?, ?, ?, ?)';
      await connection.query(insertWorkoutQuery, [workoutId, workoutPlanId, week, day, description]);

      // Insert into `exercise`
      exercises.forEach(async (exercise) => {
        const { id, name, series, repetitions, weight, rir, rpe, comments } = exercise;
        const insertExerciseQuery = 'INSERT INTO exercise (id, name, series, reps, weight, rir, rpe, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.query(insertExerciseQuery, [id, name, series, repetitions, weight, rir, rpe, comments]);
        // Insert into `workoutExercise`
        const insertWorkoutExerciseQuery = 'INSERT INTO workoutExercise (id, workoutId, exerciseId) VALUES (?, ?, ?)'
        await connection.query(insertWorkoutExerciseQuery, [uuidv4(), workoutId, id]);
      });
    });

    await connection.commit();

    return { id: workoutPlanId } as CreateWorkoutPlanResponse;
  } catch (error) {
    // Rollback the transaction in case of an error
    await connection.rollback();

    console.log(error);
    throw createHttpError(400, `Ha ocurrido un error al intentar gaurdar el plan de entrenamiento`);
  }
}