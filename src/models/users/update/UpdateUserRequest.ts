export type UpdateUserRequest = {
    id: string; 
    firstName: string;
    lastName: string;
    age?: number;
    phone?: string;
    email?: string;
    dni?: string;
    considerations?: string;
    daysPerWeek: boolean[];
}