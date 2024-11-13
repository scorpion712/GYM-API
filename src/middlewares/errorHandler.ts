import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

// Custom error handler
export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set the response status code to the error's status code, or 500 if undefined
  const statusCode = err.status || 500;
  
  // Log the error (optional, could be enhanced with a logging service)
  console.error(err);

  // Send the error response
  res.status(statusCode).send({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
