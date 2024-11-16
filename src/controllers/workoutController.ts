import { Request, Response } from 'express';

import { getAllWorkouts } from "../services";

export const getAll = async (_req: Request, res: Response) => {
    try {
        const workouts = await getAllWorkouts();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
};