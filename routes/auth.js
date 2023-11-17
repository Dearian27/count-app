import express from 'express';
import { getUsers, lowerUser, promoteUser, signIn, signUp } from '../contollers/auth.js';
import { verifyToken } from '../contollers/verifyToken.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/', getUsers);
router.put('/promote/:id', verifyToken, promoteUser);
router.put('/low/:id', verifyToken, lowerUser);

export default router;