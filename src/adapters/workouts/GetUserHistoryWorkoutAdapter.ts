import { GetUserWorkoutHistoryResponse, WorkoutPlans } from "../../models";

export const adaptGetUserWorkoutHistoryToResponse = (res: any): GetUserWorkoutHistoryResponse => {   
  
    return {
      workouts: res.map((w: any) => ({
        id: w.workoutPlanId,
        userName: w.userName,
        name: w.title,
        objective: w.objective,
        duration: w.duration,
        initDate: new Date(w.init_date),
        endDate: w.end_date ? new Date(w.end_date).getTime() : undefined,
      })),
      total: res[0]?.total || 0
    };
  };
  