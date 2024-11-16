import { GetWorkoutByIdResponse } from "../../models";

export const adaptGetWorkoutToResponse = (res: any) => {
    const workoutPlan = {
        id: res[0].workoutPlanId,
        name: res[0].title,
        objective: res[0].objective,
        duration: res[0].duration,
        initDate: new Date(res[0].init_date).getTime(),
        endDate: res[0].end_date ? new Date(res[0].end_date).getTime() : undefined,
        assignedUsers: [] as User[],
        workouts: [] as Workout[],
    } as GetWorkoutByIdResponse;

    res.forEach((row: any) => {  
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