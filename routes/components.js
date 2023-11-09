import express from 'express';
import { createComponent, getAllComponents, getComponentsByType, addComponentToComputer, deleteComponent, getComponents, updateComponent } from '../contollers/components.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/type/:type', getComponentsByType);
router.get('/:id', getComponents);
//router.get('/:id', getComputerComponents);
router.post('/create', createComponent);
router.post('/:id', addComponentToComputer);
router.post('/update/:id', updateComponent);
router.delete('/delete', deleteComponent);


// module.exports = router;
export default router;