import { v4 as uuidv4 } from 'uuid';

import { RegisterUserPaymentRequest, RegisterUserPaymentResponse } from "../../models";
import pool from '../../config/db';
import createHttpError from 'http-errors';

export const registerUserPaymentService = async (request: RegisterUserPaymentRequest) => {
    const connection = await pool.getConnection();

    const res = await connection.query('SELECT * FROM users WHERE id = ?', [request.userId]);
    if (!res[0]) {
        throw new Error('El usuario no existe');
    }

    await connection.beginTransaction();

    const { userId, date, amount, timesPerWeek } = request;
    try {
        // Insert into `userPayment`
        const userPaymentId = uuidv4();
        const insertUserPaymentQuery = 'INSERT INTO payments (id, userId, date, amount, timesPerWeek) VALUES (?, ?, ?, ?, ?)'
        await connection.query(insertUserPaymentQuery, [userPaymentId, userId, new Date(date), amount, timesPerWeek]);

        await connection.commit();

        return { id: userPaymentId } as RegisterUserPaymentResponse;
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();

        console.log(error);
        throw createHttpError(400, 'Ha ocurrido un error al intentar guardar el pago de usuario');
    }
}