export type GetUserMembershipHistoryRequest = {
    userId: string;
    // TO DO: add filters
}

export type GetUserMembershipHistoryResponse = {
    memberships: Membership[];
    total: number;
}

type Membership = {
    id: string;
    timesPerWeek: number;
    date: Date;
    amount: number;
}