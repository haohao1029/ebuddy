import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebaseConfig';
import { ApiError } from '../utils/apiError';

interface AuthenticatedRequest extends Request {
  user?: { uid: string; [key: string]: any };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new ApiError(401, 'Unauthorized'));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(new ApiError(401, 'Unauthorized'));
  }
};
