export type GetUserWorkoutResponse = {
    id: string;
    workoutPlanName: string;
    objective?: string;
    duration?: number;
    initDate: number;
    endDate?: number;
    userName: string;
    userId: string;
    userDaysPerWeek: boolean[];
    workouts: Workout[];
}

type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercises: Exercise[];
}

type Exercise = {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    rir?: number;
    rpe?: number;
    comments: string;
}