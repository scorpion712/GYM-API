import { Request, Response } from 'express';
import { authService } from '../services/auth/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send((error as Error).message);
  }
};
