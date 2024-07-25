import { Request, Response, NextFunction } from 'express';
import { db } from '../config/firebaseConfig';
import { ApiError } from '../utils/apiError';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    [key: string]: any;
  };
}

export const fetchUserData = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user) {
    return next(new ApiError(403, 'User information not found'));
  }
  try {
    const userDoc = await db.collection('users').doc(authReq.user.uid).get();
    if (!userDoc.exists) {
      return next(new ApiError(404, 'User not found'));
    }
    res.status(200).send(userDoc.data());
  } catch (error) {
    next(new ApiError(500, error instanceof Error ? error.message : 'An unknown error occurred'));
  }
};

export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user) {
    return next(new ApiError(403, 'User information not found'));
  }
  
  // Ensure that data is a plain object
  const data = { ...req.body };

  try {
    await db.collection('users').doc(authReq.user.uid).set(data, { merge: true });
    res.status(200).send({ message: 'User data updated successfully' });
  } catch (error) {
    next(new ApiError(500, error instanceof Error ? error.message : 'An unknown error occurred'));
  }
};

export const createUserData = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user) {
    return next(new ApiError(403, 'User information not found'));
  }

  const { name, email } = req.body;

  try {
    // Ensure that data is a plain object
    const userData = { name, email, uid: authReq.user.uid };
    await db.collection('users').doc(authReq.user.uid).set(userData);
    res.status(201).json({ message: 'User data created successfully' });
  } catch (error) {
    next(new ApiError(500, error instanceof Error ? error.message : 'An unknown error occurred'));
  }
};
