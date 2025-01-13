import { GetMembershipHistoryResponse } from "../../models";

export const adaptGetMembershipHistory = (res: any) : GetMembershipHistoryResponse => {
    return {
        memberships: res.map((membership: any) => ({
            id: membership.id,
            userId: membership.userId,
            userName: membership.userName,
            daysPerWeek: membership.timesPerWeek,
            total: membership.amount,
            date: membership.date,
        })),
        total: res[0].total
    }
}