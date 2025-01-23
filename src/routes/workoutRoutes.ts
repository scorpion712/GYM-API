import { Router } from 'express'; 
import { create, edit, getAll, getById, getUserWorkoutHistory, getUserWorkoutplan } from '../controllers/workoutController';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/', edit);
router.get('/User/:id', getUserWorkoutplan);	
router.get('/History/User/:id', getUserWorkoutHistory);	

export default router;
