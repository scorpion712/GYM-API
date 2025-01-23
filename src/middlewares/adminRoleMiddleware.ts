import { Request, Response, NextFunction } from "express";

export const adminRoleMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    if (!(req as any).user || (req as any).user.userRole !== 'admin') {
        return res.status(403).json({ message: 'No tiene permiso para acceder a esta acción' });
    }
    next();
};