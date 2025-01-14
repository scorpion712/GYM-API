import { GetMembershipHistoryRequest, GetUserMembershipHistoryRequest, RegisterUserPaymentRequest } from '../models';
import { getMembershipsHistoryService } from '../services/membership/getMembershipsHistoryService';
import { getUserMembershipsHistoryService } from '../services/membership/getUserMembershipHistory';
import { registerUserPaymentService } from '../services/membership/registerUserPayment';

export const registerUserPayment = async (req: any, res: any) => {
    try {
        const response = await registerUserPaymentService(req.body as RegisterUserPaymentRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getMembershipsHistory = async (req: any, res: any) => {
    try {
        const response = await getMembershipsHistoryService(req.body as GetMembershipHistoryRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getUserMembershipHistory = async (req: any, res: any) => {
    try {
        const response = await getUserMembershipsHistoryService(req.body as GetUserMembershipHistoryRequest);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}