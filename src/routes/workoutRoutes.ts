import { Router } from 'express'; 
import { create, edit, getAll, getById, getUserWorkoutplan } from '../controllers/workoutController';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/', edit);
router.get('/User/:id', getUserWorkoutplan);	

export default router;
