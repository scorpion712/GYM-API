import createHttpError from 'http-errors';
import { ResultSetHeader } from 'mysql2';

import pool from '../../config/db';
import { RemoveUserResponse } from '../../models';

export const removeUser = async (id: string) => { 
    try {
      const res = await pool.query('UPDATE users SET active = false WHERE id = ?', [id]);
      const affectedRows = (res[0] as ResultSetHeader).affectedRows;
      
      if (affectedRows == 0) throw createHttpError(404, `No se encontró el usuario buscado`);
      
      return { id: id } as RemoveUserResponse;
    } catch (error) {
      throw createHttpError(400, `Ha ocurrido un error al intentar eliminar el usuario`); 
    }
  };