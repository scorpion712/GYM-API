export type GetUserWorkoutHistoryResponse = {
    workouts: WorkoutPlans[];
    total: number;
}

export type WorkoutPlans = {
    id: string; 
    userName: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;  
}	