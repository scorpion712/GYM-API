import { GetUserWorkoutHistoryResponse, Workout, WorkoutPlans } from "../../models";

export const adaptGetUserWorkoutHistoryToResponse = (res: any): GetUserWorkoutHistoryResponse => {
    // Create a map to group workouts by workoutPlanId
    const workoutPlansMap: { [key: string]: WorkoutPlans } = {};
  
    // Loop through the results and organize them into the desired structure
    res.forEach((row: any) => {
      // Create a workoutPlan if it doesn't exist in the map
      if (!workoutPlansMap[row.workoutPlanId]) {
        workoutPlansMap[row.workoutPlanId] = {
          id: row.workoutPlanId,
          userId: row.userId,
          userName: row.userName,
          name: row.title,
          objective: row.objective,
          duration: row.duration,
          initDate: new Date(row.init_date),
          endDate: row.end_date ? new Date(row.end_date) : undefined,
          workouts: [] // Initialize workouts array
        };
      }
  
      // Find or create the workout
      const workout = workoutPlansMap[row.workoutPlanId].workouts.find((w: Workout) => w.id === row.workoutId);
      if (!workout) {
        // If the workout doesn't exist, create a new one
        workoutPlansMap[row.workoutPlanId].workouts.push({
          id: row.workoutId,
          week: row.week,
          day: row.day,
          description: row.description,
          exercise: [] // Initialize exercises array
        });
      }
  
      // Find the exercise and add it to the corresponding workout
      const exercise = {
        id: row.exerciseId,
        name: row.name,
        series: row.series,
        repetitions: row.reps,
        weight: row.weight,
        rir: row.rir,
        rpe: row.rpe,
        comments: row.comments
      };
  
      // Add the exercise to the workout's exercise list
      workoutPlansMap[row.workoutPlanId].workouts.find((w: Workout) => w.id === row.workoutId)?.exercise.push(exercise);
    });
  
    // Return the structured data
    return {
      workouts: Object.values(workoutPlansMap),
      total: res[0]?.total || 0
    };
  };
  