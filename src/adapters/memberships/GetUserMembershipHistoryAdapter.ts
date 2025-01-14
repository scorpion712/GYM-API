import { GetUserMembershipHistoryResponse } from "../../models"

export const adaptGetUserMembershipHistory = (res: any) : GetUserMembershipHistoryResponse => {
    return {
        memberships: res.map((membership: any) => ({
            id: membership.id,
            timesPerWeek: membership.timesPerWeek,
            date: membership.date,
            amount: membership.amount,
        })),
        total: res[0].total
    }
}