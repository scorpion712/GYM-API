import { RegisterUserPaymentRequest } from '../models';
import { registerUserPaymentService } from '../services/membership/registerUserPayment';

export const registerUserPayment = async (req: any, res: any) => {
    try {  
        const response = await registerUserPaymentService( req.body as RegisterUserPaymentRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}