export type GetWorkoutPlansResponse = {
    workouts: WorkoutPlan[];
    total: number;
}

export type WorkoutPlan = {
    id: string;
    name: string;
    objective: string;
    duration: number;
    initDate: number;
    endDate?: number;
    assignedUsers: number;
}