import createHttpError from 'http-errors';
import { ResultSetHeader } from 'mysql2';

import pool from '../../config/db';
import { UpdateUserRequest, UpdateUserResponse } from '../../models';

export const updateUserService = async (req: UpdateUserRequest) => {
  try { 
    const { id, firstName, lastName, age, phone, email, dni, considerations, daysPerWeek } = req;
    const res = await pool.query(
      'UPDATE users ' + 
        'SET firstName = ?, ' +  
          'lastName = ?, ' +  
          'age = ?, ' +
          'phone = ?, ' +
          'email = ?, ' +
          'idNumber = ?, ' +
          'considerations = ?, ' +
          'daysPerWeek = ? ' +
        'WHERE id = ?',
      [firstName, lastName, age, phone, email, dni, considerations, daysPerWeek.toString(), id]
    );

    const affectedRows = (res[0] as ResultSetHeader).affectedRows;
    
    if (affectedRows == 0) throw createHttpError(404, `No se encontró el usuario buscado`);
    
    return { id: id } as UpdateUserResponse;
  } catch (error) {
    throw createHttpError(400, `Ha ocurrido un error al intentar actualizar el usuario`);
  }
};