import { Request, Response } from 'express';

import { getAllWorkouts } from "../services";
import { getWorkoutById } from '../services/workouts/getWorkoutById';

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