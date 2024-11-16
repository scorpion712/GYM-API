import { Router } from 'express'; 
import { create, edit, getAll, getById } from '../controllers/workoutController';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/', edit);

export default router;
