import { Router } from 'express'; 
import { create, edit, getAll, getById, getUserWorkoutHistory, getUserWorkoutplan } from '../controllers/workoutController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminRoleMiddleware } from '../middlewares/adminRoleMiddleware';

const router = Router();

router.use(authMiddleware); 

router.get('/', adminRoleMiddleware, getAll);
router.get('/:id', adminRoleMiddleware, getById);
router.post('/', adminRoleMiddleware,create);
router.put('/', adminRoleMiddleware,edit);
router.get('/User/:id', getUserWorkoutplan);	
router.get('/History/User/:id', getUserWorkoutHistory);	

export default router;
