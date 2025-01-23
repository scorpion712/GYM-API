import { Router } from 'express'; 
import { create, getAll, getById, removeUser, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminRoleMiddleware } from '../middlewares/adminRoleMiddleware';

const router = Router();

// Apply auth middleware to all routes in this router
router.use(authMiddleware); 

router.post('/', adminRoleMiddleware,  create); 
router.get('/', adminRoleMiddleware,  getAll); 
router.get('/:id', adminRoleMiddleware,  getById); 
router.put('/', adminRoleMiddleware,  updateUser);
router.delete('/:id', adminRoleMiddleware,  removeUser);

export default router;
