import express from 'express';
import { createComponent, getAllComponents, getComponentsByType, addComponentToComputer, deleteComponent, getComponents, updateComponent, removeComponent } from '../contollers/components.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/type/:type', getComponentsByType);
router.get('/:id', getComponents);
//router.get('/:id', getComputerComponents);
router.post('/create', createComponent);
router.post('/remove/:id', removeComponent);
router.post('/:id', addComponentToComputer);
router.post('/update/:id', updateComponent);
router.delete('/delete/:id', deleteComponent);


// module.exports = router;
export default router;