import { Request, Response } from 'express';

import { createWorkout, getAllWorkouts, getWorkoutById } from "../services";
import { CreateWorkoutPlanRequest } from '../models';

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
        const workout = await editWorkout(req.body as EditWorkoutPlanRequest);
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).send((error as Error).message);
    } 
}