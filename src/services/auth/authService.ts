import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import pool from '../../config/db';
import createHttpError from 'http-errors';

dotenv.config();

const login = async (email: string, password: string): Promise<string> => { 
    try {
        // Fetch user by email
        const res = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = res[0];

        if (!user) {
            throw new Error('User not found');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, (user as any).password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT
        const token = jwt.sign(
            { id: (user as any).id, email: (user as any).email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // Token expiration time
        );

        return token;

    } catch (error) {
        throw createHttpError(400, `Ha ocurrido un error al intentar autenticar el usuario`);
    }
};


export const authService = {
    login
};