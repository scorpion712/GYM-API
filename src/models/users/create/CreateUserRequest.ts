export type CreateUserRequest = {
    firstName: string;
    lastName?: string; 
    age?: number;
    phone?: string;
    email?: string;
    dni?: string;
    considerations?: string;
    daysPerWeek: number;
}