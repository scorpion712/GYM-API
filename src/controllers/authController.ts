import { Request, Response } from 'express';
import { authService } from '../services/auth/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const loggedUser = await authService.login(email, password);

    res.json(loggedUser);

  } catch (error) {
    res.status(404).send((error as Error).message);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken, userId } = req.body;

  if (!userId) {
    res.status(403).json({ message: 'No se encontró el id de usuario' });
  }
  if (!refreshToken) {
    res.status(403).json({ message: 'Error al revalidar el token' });
  }

  try {
    const newAccessToken = await authService.refreshToken(refreshToken, userId);

    res.json(newAccessToken);
  } catch (err) {
    res.status(401).json({ message: 'Refresh token inválido o expirado' });
  }
};
