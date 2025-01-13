import { Router } from "express";
import { getMembershipsHistory, registerUserPayment } from "../controllers/membershipController";

const router = Router();

router.post('/', registerUserPayment);
router.get('/', getMembershipsHistory);	

export default router;	