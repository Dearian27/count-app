import express from 'express';
import { createComputer, getComputers, getComputersById, deleteComputerById, updateComputer} from '../contollers/computers.js';
import { verifyToken } from '../contollers/verifyToken.js';

const router = express.Router();

router.get('/', getComputers);
router.get('/:id', getComputersById);
router.post('/', createComputer);
router.post('/update/:id', updateComputer);
router.delete('/delete/:id', verifyToken, deleteComputerById);

// module.exports = router;
export default router;