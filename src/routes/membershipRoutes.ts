import { Router } from "express";
import { registerUserPayment } from "../controllers/membershipController";

const router = Router();

router.post('/', registerUserPayment);

export default router;	