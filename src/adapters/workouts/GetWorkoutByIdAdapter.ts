import { GetWorkoutByIdResponse } from "../../models";

export const adaptGetWorkoutToResponse = (res: any) => { 
    let workoutPlan : GetWorkoutByIdResponse | null = null;
    res.forEach((row: any) => { 
        workoutPlan = {
            id: row.workoutPlanId,
            name: row.title,
            objective: row.objective,
            duration: row.duration,
            initDate: new Date(row.init_date).getTime(),
            endDate: row.end_date ? new Date(row.end_date).getTime() : undefined,
            assignedUsers: [] as User[],
            workouts: [] as Workout[],
        }; 
 

        // Add the user to the assignedUsers array (if not already added)
        if (!workoutPlan.assignedUsers.some((user) => user.id === row.userId)) {
            workoutPlan.assignedUsers.push({
                id: row.userId,
                name: row.userName,
            });
        }

        // Group workouts by workoutId
        let workout = workoutPlan.workouts.find((w) => w.id === row.workoutId);
        if (!workout) {
            workout = {
                id: row.workoutId,
                week: row.week,
                day: row.day,
                description: row.description || '',
                exercise: [] as Exercise[],
            };
            workoutPlan.workouts.push(workout);
        }

        // Add exercises to the workout
        workout.exercise.push({
            id: row.exerciseId,
            name: row.name,
            series: parseInt(row.series, 10),
            repetitions: row.reps,
            weight: row.weight,
            rir: row.rir ? parseInt(row.rir, 10) : undefined,
            rpe: row.rpe ? parseInt(row.rpe, 10) : undefined,
            comments: row.comments || '',
        });
    });
    return workoutPlan;
}

type User = {
    id: string;
    name: string;
}

type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercise: Exercise[];
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