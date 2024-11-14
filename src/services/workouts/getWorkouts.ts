import createHttpError from 'http-errors';
import pool from '../../config/db';
import { adaptGetAllWorkoutsToResponse } from '../../adapters';

export const getAllWorkouts = async () => {
  try {
    const res = await pool.query(`SELECT wp.id as workoutPlanId,
       wp.title as name,
       wp.objective,
       wp.duration,
       wp.init_date,
       wp.end_date,
       (SELECT COUNT(*) FROM userWorkoutPlan WHERE workoutPlanId = wp.id) as assignedUsersCount,
       (SELECT COUNT(*) FROM workoutPlan) as total  
      FROM workoutPlan wp`);
      
      return adaptGetAllWorkoutsToResponse(res[0]);

  } catch (error) {
    console.log(error)
    throw createHttpError(400, `Ha ocurrido un error al intentar obtener todos los planes de entrenamiento`);
  }
};