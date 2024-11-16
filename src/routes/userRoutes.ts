import { Router } from 'express'; 
import { create, getAll, getById, removeUser, updateUser } from '../controllers/userController';

const router = Router();

router.post('/', create); 
router.get('/', getAll); 
router.get('/:id', getById); 
router.put('/', updateUser);
router.delete('/:id', removeUser);

export default router;
