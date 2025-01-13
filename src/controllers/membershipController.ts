import { GetMembershipHistoryRequest, RegisterUserPaymentRequest } from '../models';
import { getMembershipsHistoryService } from '../services/membership/getMembershipsHistoryService';
import { registerUserPaymentService } from '../services/membership/registerUserPayment';

export const registerUserPayment = async (req: any, res: any) => {
    try {  
        const response = await registerUserPaymentService( req.body as RegisterUserPaymentRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getMembershipsHistory = async (req: any, res: any) => {
    try {  
        const response = await getMembershipsHistoryService( req.body as GetMembershipHistoryRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}