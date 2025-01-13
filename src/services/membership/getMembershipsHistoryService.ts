import createHttpError from "http-errors";

import pool from '../../config/db';
import { GetMembershipHistoryRequest } from "../../models";
import { adaptGetMembershipHistory } from "../../adapters/memberships/GetMembershipHistoryAdapter";

export const getMembershipsHistoryService = async (req: GetMembershipHistoryRequest) => {
    const connection = await pool.getConnection();

    try {
        // TO DO: add filters
        const res = await connection.query(`SELECT (SELECT COUNT(*) FROM users WHERE active) as total,  
                p.id,
                p.userId,
                CONCAT(u.firstName, ' ', u.lastName) AS userName,
                p.amount,
                p.timesPerWeek,
                p.date
            FROM payments p JOIN users u ON u.id = p.userId
            ORDER BY p.date DESC`, [req.userId]);
     
        return adaptGetMembershipHistory(res[0]);
    } catch (error) {

        console.log(error);
        throw createHttpError(400, 'Ha ocurrido un error al intentar obtener el historial de membresías');
    }
};