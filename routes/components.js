import express from 'express';
import { createComponent, getAllComponents, getComponentsByType, addComponentToComputer, deleteComponent, removeComponent, updateComponent, changeComponentOfComputer, changeMultipleComponentInComputer } from '../contollers/components.js';
import { verifyToken } from '../contollers/verifyToken.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/:type', getComponentsByType);
// router.get('/:id', getComputerComponents);
router.post('/create', createComponent);
router.post('/remove/:id', verifyToken, removeComponent);
router.put('/:id', changeComponentOfComputer);
router.put('/multiple/:id', changeMultipleComponentInComputer);
router.put('/add/:id', addComponentToComputer);
router.post('/update/:id', verifyToken, updateComponent);
router.delete('/delete/:id', verifyToken, deleteComponent);

// module.exports = router;
export default router;