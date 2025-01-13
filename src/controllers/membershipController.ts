import { RegisterUserPaymentRequest } from '../models';
import { registerUserPaymentService } from '../services/membership/registerUserPayment';

export const registerUserPayment = async (req: any, res: any) => {
    try {
        const { userId, date, total, daysPerWeek } = req.body;

        const response = await registerUserPaymentService({userId, date, amount: total, timesPerWeek: daysPerWeek} as RegisterUserPaymentRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}