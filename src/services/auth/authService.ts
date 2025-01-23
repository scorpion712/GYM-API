import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

import pool from '../../config/db';
import { generateAccessToken, generateRefreshToken } from '../../helpers/auth/jwtHelper'; 
import { PoolConnection } from 'mysql2/promise';

dotenv.config();

interface AuthenticationJWT { accessToken: string, refreshToken: string }

const login = async (email: string, password: string): Promise<AuthenticationJWT> => {
    try {
        // Fetch user by email
        const res =  await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (!res[0]) {
            throw createHttpError(400, 'Usuario no encontrado');
        }
        const user = res[0];
 
        // Validate password
        const isPasswordValid = await bcrypt.compareSync(password, (user as any)[0].password ?? "12345678");
        if (!isPasswordValid) {
            throw createHttpError(400, 'Contraseña incorrecta');
        }

        // Generate JWT

        return generateAuthToken((user as any)[0] as any);

    } catch (error) {
        console.log(error)
        throw createHttpError(400, (error as Error).message ?? `Ha ocurrido un error al intentar autenticar el usuario`);
    }
};


const refreshToken = async (refreshToken: string, userId: string): Promise<AuthenticationJWT> => {
    try {
        const connection = await pool.getConnection();

        // Fetch refresh token
        const res = await connection.query(
            `SELECT r.*, u.email, u.userRole, u.firstName, u.lastName 
             FROM refreshTokens r 
                JOIN users u ON (r.userId = u.id) 
            WHERE id = ? 
                AND userId = ? 
                AND revokedAt IS NULL`,
            [refreshToken, userId]
        );

        if (!res[0]) {
            throw createHttpError(400, 'Token no encontrado');
        }

        const refreshTokenData = (res[0] as any)[0];

        // Check if token is expired
        const expiryDate = new Date((refreshTokenData as any).expiresAt);
        if (expiryDate < new Date()) {
            throw createHttpError(400, 'Token expirado');
        }

        // Update refresh token
        const updateRefreshToken = 'UPDATE refreshTokens SET revokedAt = CURRENT_TIMESTAMP WHERE id = $1 AND userId = $2';
        await connection.query(updateRefreshToken, [refreshToken, userId]);

        // Generate new access token

        return generateAuthToken(res[0] as any);

    } catch (error) {
        throw createHttpError(400, `Ha ocurrido un error al intentar autenticar el usuario`);
    }
};

export const authService = {
    login,
    refreshToken
};



const generateAuthToken = async ( user: { id: string, email: string, userRole: string, firstName: string, lastName: string }) => {
    const connection = await pool.getConnection();

    const token = generateAccessToken(user.id, user.email, user.userRole, `${user.firstName} ${user.lastName}`);
    const refreshToken = generateRefreshToken(user.id);

    await connection.beginTransaction();
    const insertRefreshToken = 'INSERT INTO refreshTokens (id, userId, expiresAt) VALUES (?, ?, ?)';
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number.parseInt(process.env.JWT_REFRESH_EXPIRATION ?? "1"));
    await connection.query(insertRefreshToken, [uuidv4(), (user as any).id, expiryDate]);

    return {
        accessToken: token,
        refreshToken: refreshToken
    };
}