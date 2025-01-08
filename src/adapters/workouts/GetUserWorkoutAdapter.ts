import { GetUserWorkoutResponse } from "../../models";

export const adaptGetUserWorkoutToResponse = (res: any) => { 
    if (!res[0]) return null; 
    const workoutPlan = {
        id: res[0].workoutPlanId,
        workoutPlanName: res[0].title,
        objective: res[0].objective,
        duration: res[0].duration,
        initDate: new Date(res[0].init_date).getTime(),
        endDate: res[0].end_date ? new Date(res[0].end_date).getTime() : undefined,
        userName: res[0].userName,
        userId: res[0].userId,
        userDaysPerWeek: res[0].daysPerWeek.split(',').map((value: string) => value === 'true'),
        workouts: [],
    } as GetUserWorkoutResponse;

    res.forEach((row: any) => {  
        // Group workouts by workoutId
        let workout = workoutPlan.workouts.find((w) => w.id === row.workoutId);
        if (!workout) {
            workout = {
                id: row.workoutId,
                week: row.week,
                day: row.day,
                description: row.description || '',
                exercises: [],
            };
            workoutPlan.workouts.push(workout);
        } 
        // Add exercises to the workout
        workout.exercises.push({
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
