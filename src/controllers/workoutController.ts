import { Request, Response } from 'express';

import { createWorkout, getAllWorkouts, getUserWorkout, getWorkoutById, updateWorkout } from "../services";
import { CreateWorkoutPlanRequest, UpdateWorkoutPlanRequest } from '../models';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const workouts = await getAllWorkouts();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const workout = await getWorkoutById(req.params.id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
};

export const create = async (req: Request, res: Response) => {
    try { 
        const workout = await createWorkout(req.body as CreateWorkoutPlanRequest);
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).send((error as Error).message);
    } 
}

export const edit = async (req: Request, res: Response) => {
    try { 
        const workout = await updateWorkout(req.body as UpdateWorkoutPlanRequest);
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).send((error as Error).message);
    } 
}

export const getUserWorkoutplan = async (req: Request, res: Response) => {
    try {
        const workout = await getUserWorkout(req.params.id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).send((error as Error).message);
    } 
}