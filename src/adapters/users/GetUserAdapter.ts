import { GetUserResponse } from "../../models"

export const adaptGetUserToResponse = (res: any) => { 
    return {
        id: res[0].id,
        firstName: res[0].firstName,
        lastName: res[0].lastName,
        phone: res[0].phone,
        email: res[0].email,
        idNumber: res[0].idNumber,
        age: res[0].age,
        daysPerWeek: res[0].daysPerWeek.split(',').map((value: string) => value === 'true'),
        lastPaidDate: res[0].lastPaidDate ? new Date(res[0].lastPaidDate).getTime() : null,
        considerations: res[0].considerations,
        active: res[0].active
    } as GetUserResponse
}