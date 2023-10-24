import express from 'express';
import { createComputer, getComputers } from '../controlers/computers.js';

const router = express.Router();

router.get('/', getComputers);
router.post('/', createComputer);

// module.exports = router;
export default router;