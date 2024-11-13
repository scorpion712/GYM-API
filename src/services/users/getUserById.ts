import dotenv from 'dotenv';

import pool from '../../config/db';
import createHttpError from 'http-errors';
import { adaptGetUserToResponse } from '../../adapters';

dotenv.config();

export const getUserById = async (id: string) => { 
    try {
      const res = await pool.query(`SELECT u.id, 
          u.firstName, 
          u.lastName, 
          u.age, 
          u.phone, 
          u.email, 
          u.idNumber, 
          u.considerations, 
          u.daysPerWeek,
          u.active,
          MAX(p.date) AS lastPaidDate 
        FROM users u 
          LEFT JOIN payments p ON u.id = p.userId
        WHERE u.id = ? AND u.active`, [id]);
      if (!res[0]) 
        throw createHttpError(400, `No se encontró el usuario buscado`);
      return adaptGetUserToResponse(res[0]);
    } catch (error) {
      console.log(error)
      throw createHttpError(400, `Ha ocurrido un error al intentar obtener el usuario`);
    }
  };
  // TO DO: Create models and adapters