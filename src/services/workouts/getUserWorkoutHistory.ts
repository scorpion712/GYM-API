import createHttpError from "http-errors";

import pool from '../../config/db';
import { adaptGetUserWorkoutHistoryToResponse } from "../../adapters";

export const getUserWorkoutHistoryService = async (userId: string) => {
    try {
        const res = await pool.query(`SELECT wp.id as workoutPlanId,
            wp.title as title,
            wp.objective,
            wp.duration,
            wp.init_date,
            wp.end_date, 
            CONCAT(u.firstName, ' ', u.lastName) AS userName
            FROM workoutPlan wp 
                JOIN userWorkoutPlan uwp ON wp.id = uwp.workoutPlanId
                JOIN users u ON uwp.userId = u.id 
                WHERE u.id = ? AND u.active 
            GROUP BY wp.id, uwp.createdAt
            ORDER BY uwp.createdAt DESC`,
            [userId]);

        if (!res[0])
            throw createHttpError(400, `No se encontró el historial de planes de entrenamiento para el usuario`);

        return adaptGetUserWorkoutHistoryToResponse(res[0]);

    } catch (error) {
        console.log(error)
        throw createHttpError(400, `Ha ocurrido un error al intentar obtener el historial de planes de entrenamiento del usuario`);
    }
};