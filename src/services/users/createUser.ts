import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import pool from '../../config/db';
import { CreateUserRequest, CreateUserResponse } from '../../models';

export const createUser = async (request: CreateUserRequest): Promise<CreateUserResponse> => {
  const { firstName, lastName, age, phone, email, dni, considerations, daysPerWeek } = request;
  try {

    // Generate UUID manually for the user
    const userId = uuidv4();
    const password = bcrypt.hashSync(request.dni ?? request.phone ?? '12345678', 10);
    const res = await pool.query(
      'INSERT INTO users (id, firstName, lastName, age, phone, email, idNumber, considerations, daysPerWeek, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, firstName, lastName, age, phone, email, dni, considerations, daysPerWeek.toString(), password],
    ); 
    return { id: userId } as CreateUserResponse;
  } catch (error) {
    console.log(error);
    throw createHttpError(400, `Ha ocurrido un error al intentar crear el usuario`);
  }
};