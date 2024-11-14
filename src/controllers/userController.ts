import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserService
} from '../services'; 
import { CreateUserRequest, UpdateUserRequest, userCreateSchema, userUpdateSchema } from '../models';
import createHttpError from 'http-errors';

export const create = async (req: Request, res: Response) => {  
  try {
    // Validate request body 
    const { error } = userCreateSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, `Error: ${error.details.map(e => e.message).join(', ')}`);
    }
    const newUser = await createUser(req.body as CreateUserRequest);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const updateUser = async (req:Request, res: Response) => {
  try {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) { 
      throw createHttpError(400, `Error: ${error.details.map(e => e.message).join(', ')}`);
    }
    const updatedUser = await updateUserService(req.body as UpdateUserRequest);
    res.status(200).json(updatedUser);
  } catch (error) { 
    res.status(400).send((error as Error).message);
  }
}