import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createUserData, fetchUserData, updateUserData } from '../controller/users';

const router = express.Router();

router.get('/fetch-user-data', authMiddleware, fetchUserData);
router.put('/update-user-data', authMiddleware, updateUserData);
router.post('/create-user-data', authMiddleware, createUserData);

export default router;
