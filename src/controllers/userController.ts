import { Request, Response } from 'express';
import {
  createUser
} from '../services/users'; 
import { CreateUserRequest, userSchema } from '../models';
import createHttpError from 'http-errors';

export const create = async (req: Request, res: Response) => {  
  try {
    // Validate request body 
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, `Error: ${error.details.map(e => e.message).join(', ')}`);
    }
    const newUser = await createUser(req.body as CreateUserRequest);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};