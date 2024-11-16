import createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader } from 'mysql2';

import pool from '../../config/db';
import { UpdateUserResponse, UpdateWorkoutPlanRequest } from '../../models';


export const updateWorkout = async (request: UpdateWorkoutPlanRequest) => {
  const { id, name, objective, duration, initDate, endDate, workouts, customersId } = request;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update `workoutPlan` details
    const updateWorkoutPlanQuery = `
      UPDATE workoutPlan 
      SET title = ?, objective = ?, duration = ?, init_date = ?, end_date = ? 
      WHERE id = ?
    `;
    const res = await connection.query(updateWorkoutPlanQuery, [name, objective, duration, initDate, endDate, id]);

    const affectedRows = (res[0] as ResultSetHeader).affectedRows;

    if (affectedRows == 0) throw createHttpError(404, `No se encontró el plan de entrenamiento buscado`);
    // Handle `userWorkoutPlan` updates:
    // - Add new customers if any.
    // - Remove customers that are no longer associated.
    if (customersId) {
      // Remove users that are no longer associated
      const removeUsersQuery = `
        DELETE FROM userWorkoutPlan 
        WHERE workoutPlanId = ?
      `;
      await connection.query(removeUsersQuery, [id, customersId]);

      // Add new users
      customersId.forEach(async (customerId) => {
        const insertUserWorkoutPlanQuery = `
          INSERT INTO userWorkoutPlan (id, userId, workoutPlanId) 
          VALUES (?, ?, ?)
        `;
        await connection.query(insertUserWorkoutPlanQuery, [uuidv4(), customerId, id]);
      });
    }

    // Handle `workouts` and `exercises` updates:
    for (const workout of workouts) {
      const { id: workoutId, week, day, description, exercises } = workout;

      const newWorkoutId = !workoutId ? uuidv4() : null;

      if (workoutId) {
        // If the workout exists, update it
        const updateWorkoutQuery = `
          UPDATE workout
          SET week = ?, day = ?, description = ?
          WHERE id = ?
        `;
        await connection.query(updateWorkoutQuery, [week, day, description, workoutId]);
      } else {
        // If the workout does not exist, insert it
        const insertWorkoutQuery = `
          INSERT INTO workout (id, planId, week, day, description) 
          VALUES (?, ?, ?, ?, ?)
        `;
        await connection.query(insertWorkoutQuery, [newWorkoutId, id, week, day, description]);
      }

      // Handle exercises
      for (const exercise of exercises) {
        const { id: exerciseId, name, series, repetitions, weight, rir, rpe, comments } = exercise;

        const newExerciseId = !exerciseId ? uuidv4() : null; 

        if (exerciseId) {
          // If exercise exists, update it
          const updateExerciseQuery = `
            UPDATE exercise
            SET name = ?, series = ?, reps = ?, weight = ?, rir = ?, rpe = ?, comments = ?
            WHERE id = ?
          `;
          await connection.query(updateExerciseQuery, [name, series, repetitions, weight, rir, rpe, comments, exerciseId]);

          // Remove exercises that are no longer associated to workout
          const removeExercisesQuery = `
            DELETE FROM workoutExercise 
            WHERE workoutId = ?
          `;
          await connection.query(removeExercisesQuery, [workoutId]);

        } else { 
          // If exercise does not exist, insert it
          const insertExerciseQuery = `
            INSERT INTO exercise (id, name, series, reps, weight, rir, rpe, comments) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          await connection.query(insertExerciseQuery, [newExerciseId, name, series, repetitions, weight, rir, rpe, comments]);
        }

        // Handle `workoutExercise` relationship  
        const insertWorkoutExerciseQuery = `
            INSERT INTO workoutExercise (id, workoutId, exerciseId) 
            VALUES (?, ?, ?)
          `;
        await connection.query(insertWorkoutExerciseQuery, [uuidv4(), workoutId ? workoutId : newWorkoutId, exerciseId ? exerciseId : newExerciseId]);
      }
    }

    await connection.commit();

    return { id: request.id } as UpdateUserResponse;

  } catch (error) {
    await connection.rollback();
    console.log(error);
    throw createHttpError(400, `Ha ocurrido un error al intentar actualizar el plan de entrenamiento`);
  }
};