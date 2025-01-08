export type GetUserWorkoutHistoryResponse = {
    workouts: WorkoutPlans[];
    total: number;
}

export type WorkoutPlans = {
    id: string;
    userId: string;
    userName: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date; 
    workouts: Workout[];
}

export type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercise: Exercise[];
}

export type Exercise = {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    rir: number;
    rpe: number;
    comments: string;
}