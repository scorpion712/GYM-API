import express from 'express';
import cors from 'cors'; 

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import workoutRoutes from './routes/workoutRoutes';
import { errorHandler } from './middlewares/errorHandler';
import membershipRoutes from './routes/membershipRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/Auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/WorkoutPlan', workoutRoutes); 
app.use('/api/Membership', membershipRoutes); 

// Protected routes (example)
// app.use('/api/protected', authorize(['admin', 'user']), (req, res) => {
//   res.send('This is a protected route');
// });

// Use the global error handler
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});