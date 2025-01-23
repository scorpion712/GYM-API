import createHttpError from "http-errors";

import { GetUserMembershipHistoryRequest } from "../../models"; 
import pool from '../../config/db';
import { adaptGetUserMembershipHistory } from "../../adapters/memberships/GetUserMembershipHistoryAdapter";
 
export const getUserMembershipsHistoryService = async (req: GetUserMembershipHistoryRequest) => {
    const connection = await pool.getConnection();

    try {
        // TO DO: add filters
        const res = await connection.query(`SELECT (SELECT COUNT(*) FROM payments) as total,
                p.id,
                p.amount,
                p.timesPerWeek,
                p.date
            FROM payments p
            WHERE userId = ?
            ORDER BY p.date DESC`, [req.userId]);
     
        return adaptGetUserMembershipHistory(res[0]);
    } catch (error) {

        console.log(error);
        throw createHttpError(400, 'Ha ocurrido un error al intentar obtener su historial de membresías');
    }
};