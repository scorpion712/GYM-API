import createHttpError from 'http-errors';

import pool from '../../config/db';
import { adaptGetUserWorkoutToResponse } from '../../adapters';


export const getUserWorkout = async (userId: string) => {
    try {
        const res = await pool.query(`SELECT wp.id as workoutPlanId,
            wp.title as title,
            wp.objective,
            wp.duration,
            wp.init_date,
            wp.end_date,
            u.id as userId,
            CONCAT(u.firstName, ' ', u.lastName) AS userName, 
            u.daysPerWeek,
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
            u.id as userId
            FROM workoutPlan wp 
                JOIN userWorkoutPlan uwp ON wp.id = uwp.workoutPlanId
                JOIN users u ON uwp.userId = u.id
                JOIN workout w ON wp.id = w.planId
                JOIN workoutExercise we ON we.workoutId = w.id
                JOIN exercise e ON we.exerciseId = e.id
                WHERE u.id = ? AND u.active 
            GROUP BY wp.id, w.id, e.id, u.id
            ORDER BY uwp.createdAt DESC, wp.id, w.id, e.id
            LIMIT 1`,
            [userId]);

        if (!res[0])
            throw createHttpError(400, `No se encontró el plan de entrenamiento para el usuario`);

        return adaptGetUserWorkoutToResponse(res[0]);

    } catch (error) {
        console.log(error)
        throw createHttpError(400, `Ha ocurrido un error al intentar obtener el plan de entrenamiento del usuario`);
    }
};