import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, userEmail: string, userRole: string, userName: string) => {
  return jwt.sign(
    { userId, userEmail, userRole, userName },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
};
