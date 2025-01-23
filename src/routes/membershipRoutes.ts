import { Router } from "express";
import { getMembershipsHistory, getUserMembershipHistory, registerUserPayment } from "../controllers/membershipController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminRoleMiddleware } from "../middlewares/adminRoleMiddleware";

const router = Router();

router.use(authMiddleware);

router.post('/', adminRoleMiddleware, registerUserPayment);
router.get('/', adminRoleMiddleware, getMembershipsHistory);
router.get('/:id', getUserMembershipHistory);

export default router;	