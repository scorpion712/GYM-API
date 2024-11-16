import pool from '../../config/db';


// export const getUserWorkout = async (userId: string) => { 
//     try {
//         const res = await pool.query(`SELECT wp.id as workoutPlanId,
//            wp.title as title,
//            wp.objective,
//            wp.duration,
//            wp.init_date,
//            wp.end_date,
//            u.id as userId,
//            CONCAT(u.firstName, ' ', u.lastName) AS userName, 
//            w.id as workoutId,
//            w.week,
//            w.day,
//            w.description,
//            e.id as exerciseId,
//            e.name,
//            e.series,
//            e.reps,
//            e.weight,
//            e.rir,
//            e.rpe,
//            e.comments,
//            u.id as userId,
//            (SELECT COUNT(*) FROM workoutPlan) as total  
//           FROM workoutPlan wp 
//               JOIN userWorkoutPlan uwp ON wp.id = uwp.workoutPlanId
//               JOIN users u ON uwp.userId = u.id
//               JOIN workout w ON wp.id = w.planId
//               JOIN workoutExercise we ON we.workoutId = w.id
//               JOIN exercise e ON we.exerciseId = e.id
//           WHERE u.id = $1
//           GROUP BY wp.id, w.id, e.id, u.id
//           ORDER BY wp.id, w.id, e.id`, [userId]);
//         return res.row[0];
//     } finally {
//         client.release();
//     }
// };
// // TO DO: Create models and adapters