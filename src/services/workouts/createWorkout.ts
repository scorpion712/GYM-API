import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';

import pool from '../../config/db';
import { CreateWorkoutPlanRequest, CreateWorkoutPlanResponse } from '../../models';

export const createWorkout = async (request: CreateWorkoutPlanRequest) => {
  
  await pool.beginTransaction();

  const { name, initDate, workouts, customersId, duration, endDate, objective } = request;
  try {
    // Insert into `workoutPlan`
    const workoutPlanId = uuidv4();

    const insertWorkoutPlanQuery = 'INSERT INTO workoutPlan (id, title, objective, duration, init_date) VALUES (?, ?, ?, ?, ?)'
    await pool.query(insertWorkoutPlanQuery, [workoutPlanId, name, objective, duration, initDate]);

    // Insert into `userWorkoutsPlan`
    customersId?.forEach(async customerId => {
      const insertUserWorkoutPlanQuery = 'INSERT INTO userWorkoutPlan (id, userId, workoutPlanId) VALUES (?, ?, ?)'
      await pool.query(insertUserWorkoutPlanQuery, [uuidv4(), customerId, workoutPlanId]);
    });

    // Insert into `workout`
    workouts.forEach(async (workout) => {
      const workoutId = uuidv4();
      const { week, day, description, exercises } = workout;

      const insertWorkoutQuery = 'INSERT INTO workout (id, planId, week, day, description) VALUES (?, ?, ?, ?, ?)';
      await pool.query(insertWorkoutQuery, [workoutId, workoutPlanId, week, day, description]);

      // Insert into `exercise`
      exercises.forEach(async (exercise) => {
        const { id, name, series, repetitions, weight, rir, rpe, comments } = exercise;
        const insertExerciseQuery = 'INSERT INTO exercise (id, name, series, reps, weight, rir, rpe, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await pool.query(insertExerciseQuery, [id, name, series, repetitions, weight, rir, rpe, comments]);
        // Insert into `workoutExercise`
        const insertWorkoutExerciseQuery = 'INSERT INTO workoutExercise (id, workoutId, exerciseId) VALUES (?, ?, ?)'
        await pool.query(insertWorkoutExerciseQuery, [uuidv4(), workoutId, id]);
      });
    });

    await pool.commit();

    return { id: workoutPlanId } as CreateWorkoutPlanResponse;
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.rollback();

    console.log(error);
    throw createHttpError(400, `Ha ocurrido un error al intentar gaurdar el plan de entrenamiento`);
  }
}