import { Router } from "express";
import { getMembershipsHistory, getUserMembershipHistory, registerUserPayment } from "../controllers/membershipController";

const router = Router();

router.post('/', registerUserPayment);
router.get('/', getMembershipsHistory);	
router.get('/:id', getUserMembershipHistory);	

export default router;	