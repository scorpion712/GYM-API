export type GetMembershipHistoryRequest = {
    userId: string;
    // TO DO: add filters
}

export type GetMembershipHistoryResponse = {
    memberships: Membership[];
    total: number;
}

export type Membership = {
    id: string;
    userId: string;
    userName: string;
    timesPerWeek: number;
    date: Date;
    amount: number;
}