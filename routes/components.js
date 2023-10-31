import express from 'express';
import { createComponent, getComputerComponents, getAllComponents, getComponentsByType, addComponentToComputer } from '../controlers/components.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/:type', getComponentsByType);
router.get('/[id]', getComputerComponents);
router.post('/create', createComponent);
router.patch('/:id', addComponentToComputer)

// module.exports = router;
export default router;