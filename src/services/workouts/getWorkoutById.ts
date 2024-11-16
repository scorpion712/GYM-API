import createHttpError from 'http-errors';

import pool from '../../config/db';
import { adaptGetWorkoutToResponse } from '../../adapters';

export const getWorkoutById = async (id: string) => {
    try {
        const res = await pool.query(`SELECT wp.id as workoutPlanId,
       wp.title as title,
       wp.objective,
       wp.duration,
       wp.init_date,
       wp.end_date,
       u.id as userId,
       CONCAT(u.firstName, ' ', u.lastName) AS userName, 
       w.id as workoutId,
       w.week,
       w.day,
       w.description,
       e.id as exerciseId,
       e.name,
       e.series,
       e.reps,
       e.weight,
       e.rir,
       e.rpe,
       e.comments,
       u.id as userId,
       (SELECT COUNT(*) FROM workoutPlan) as total  
      FROM workoutPlan wp 
          JOIN userWorkoutPlan uwp ON wp.id = uwp.workoutPlanId
          JOIN users u ON uwp.userId = u.id
          JOIN workout w ON wp.id = w.planId
          JOIN workoutExercise we ON we.workoutId = w.id
          JOIN exercise e ON we.exerciseId = e.id
        WHERE wp.id = ? AND u.active
      GROUP BY wp.id, w.id, e.id, u.id
      ORDER BY wp.id, w.id, e.id`, [id]);
        if (!res[0])
            throw createHttpError(400, `No se encontró el plan de entrenamiento buscado`);

        return adaptGetWorkoutToResponse(res[0]);
    } catch (error) {
        console.log(error)
        throw createHttpError(400, `Ha ocurrido un error al intentar obtener el plan de entrenamiento`);
    }
};