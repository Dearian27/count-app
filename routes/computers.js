import express from 'express';
import { createComputer, getComputers, getComputersById, deleteComputerById} from '../contollers/computers.js';

const router = express.Router();

router.get('/', getComputers);
router.get('/:id', getComputersById);
router.post('/', createComputer);
router.delete('/delete', deleteComputerById);

// module.exports = router;
export default router;