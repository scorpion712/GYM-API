import { GetWorkoutPlansResponse, WorkoutPlan } from "../../models"

export const adaptGetAllWorkoutsToResponse = (res: any): GetWorkoutPlansResponse => {
    return {
        workouts: res.map((wp: any) => ({
            id: wp.workoutPlanId,
            name: wp.name,
            objective: wp.objective,
            duration: wp.duration,
            initDate: new Date(wp.init_date).getTime(),
            endDate: wp.end_date ? new Date(wp.end_date).getTime() : undefined, 
            assignedUsers: wp.assignedUsersCount
        })),
        total: res[0].total
    }
}