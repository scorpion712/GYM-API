import { GetUsersResponse } from "../../models"

export const adaptGetAllUsersToResponse = (res: any): GetUsersResponse => {
    return {
        users: res.map((user: any) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            idNumber: user.idNumber,
            age: user.age,
            daysPerWeek: user.daysPerWeek.split(',').map((value: string) => value === 'true'),
            lastPaidDate: user.lastPaidDate ? new Date(user.lastPaidDate).getTime() : null,
            considerations: user.considerations,
            active: user.active
        })),
        total: res[0].total
    }
}