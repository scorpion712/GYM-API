import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import pool from '../../config/db';
import { CreateUserRequest, CreateUserResponse } from '../../models';
import createHttpError from 'http-errors';

dotenv.config();

export const createUser = async (request: CreateUserRequest): Promise<CreateUserResponse> => {
  const { firstName, lastName, age, phone, email, dni, considerations, daysPerWeek } = request;
  try {

    // Generate UUID manually for the user
    const userId = uuidv4();
    const res = await pool.query(
      'INSERT INTO users (id, firstName, lastName, age, phone, email, idNumber, considerations, daysPerWeek) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, firstName, lastName, age, phone, email, dni, considerations, daysPerWeek],
    ); 
    return { id: userId } as CreateUserResponse;
  } catch (error) {
    console.log(error);
    throw createHttpError(400, `Ha ocurrido un error al intentar crear el usuario`);
  }
};