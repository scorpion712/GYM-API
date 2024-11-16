export type GetUsersResponse = {
    users: UserResponse [];
    total: number;
}
interface UserResponse {
    id: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    email?: string;
    idNumber?: string;
    age?: string;
    daysPerWeek: boolean [];
    lastPaidDate?: number;
    considerations?: string;
    active: boolean;
}