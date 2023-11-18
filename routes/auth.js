import express from 'express';
import { deleteUser, getUsers, lowerUser, promoteUser, signIn, signUp } from '../contollers/auth.js';
import { verifyToken } from '../contollers/verifyToken.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/', getUsers);
router.post('/promote/:id', verifyToken, promoteUser);
router.post('/low/:id', verifyToken, lowerUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;