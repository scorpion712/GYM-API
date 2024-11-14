import { Router } from 'express'; 
import { getAll } from '../controllers/workoutController';

const router = Router();

router.get('/', getAll);

export default router;
