import createHttpError from 'http-errors';

import pool from '../../config/db';
import { adaptGetAllUsersToResponse } from '../../adapters';

export const getAllUsers = async () => {
  try {
    const res = await pool.query(`SELECT 
          (SELECT COUNT(*) FROM users WHERE active and userRole NOT LIKE 'admin') as total,
          u.id, 
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
        WHERE u.active and u.userRole NOT LIKE 'admin'
        GROUP BY u.id `);
    return adaptGetAllUsersToResponse(res[0]);
  } catch (error) {
    console.log(error)
    throw createHttpError(400, `Ha ocurrido un error al intentar obtener todos los usuarios`);
  }
};
// TO DO: support params to paginate query
        // LIMIT IFNULL(:limit, 1000)  -- Default limit to 1000 if :limit is NULL  
        // OFFSET IFNULL(:offset, 0)
