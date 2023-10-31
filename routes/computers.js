import express from 'express';
import { createComputer, getComputers, getComputersById } from '../controlers/computers.js';

const router = express.Router();

router.get('/', getComputers);
router.get('/:id', getComputersById);
router.post('/', createComputer);

// module.exports = router;
export default router;