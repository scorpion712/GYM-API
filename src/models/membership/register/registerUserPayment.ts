export type RegisterUserPaymentRequest = {
    userId: string; 
    date: Date;
    amount: number;
    timesPerWeek: number;
}

export type RegisterUserPaymentResponse = {
    id: string;
}