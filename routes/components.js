import express from 'express';
import { createComponent, addComponent, getComputerComponents, getAllComponents } from '../controlers/components.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/[id]', getComputerComponents);
router.post('/create', createComponent);
router.post('/add', addComponent);

// module.exports = router;
export default router;