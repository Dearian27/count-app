import express from 'express';
import { createComponent, getAllComponents, getComponentsByType, addComponentToComputer, deleteComponent } from '../contollers/components.js';
import { verifyToken } from '../contollers/verifyToken.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/:type', getComponentsByType);
// router.get('/:id', getComputerComponents);
router.post('/create', createComponent);
router.post('/:id', addComponentToComputer)
router.delete('/delete', verifyToken, deleteComponent);

// module.exports = router;
export default router;