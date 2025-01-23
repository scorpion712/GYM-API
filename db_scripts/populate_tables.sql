-- -------------------------------
--  POPULATE TABLES WITH DATA   --
-- -------------------------------

-- Insert users (Famous Fitness, Bodybuilders, etc.)
INSERT INTO users (id, firstName, lastName, age, phone, email, idNumber, considerations, daysPerWeek)
VALUES
('ff10e1e0-16f9-4e19-8a4d-64f80a8f8fe7', 'Admin', 'Super', 1, '123456789', 'admin@gym.com', '123456789', '', 'true,true,true,true,true'),
('a4f929d0-e2b6-4a8d-bcc2-dc94b3f38b3e', 'Arnold', 'Schwarzenegger', 76, '1234567890', 'arnold.schwarzenegger@example.com', '123456789', 'No back issues, needs a daily routine', 'true,true,true,true,true'),
('cc8e7a1a-69e7-4fd7-9253-724b84960255', 'Jay', 'Cutler', 45, '0987654321', 'jay.cutler@example.com', '987654321', 'Heavy lifting preferred, enjoys split routines', 'true,true,true,true,true'),
('f9d9f3a4-2b9f-44b9-b1f0-f953b582ed23', 'Dwayne', 'Johnson', 52, '1122334455', 'dwayne.johnson@example.com', '556677889', 'Enjoys intense cardio and weights', 'false,true,false,true,false'),
('0c32de4a-9c1d-48ea-a7ad-d7b33207c973', 'Sergio', 'Oliva', 40, '2233445566', 'sergio.oliva@example.com', '776655443', 'Focus on strength and hypertrophy', 'true,true,false,true,true'),
('6cfa88b9-7e3f-4653-b26f-d2cfc83d059b', 'Kai', 'Greene', 49, '3344556677', 'kai.greene@example.com', '334455667', 'Wants to focus on mind-muscle connection', 'true,false,true,false,true'),
('d4b9f45a-8a9b-406d-bbfa-4e7421d913b9', 'Ronnie', 'Coleman', 59, '4455667788', 'ronnie.coleman@example.com', '998877665', 'Need extreme strength training, no cardio', 'true,true,true,true,true');

-- Insert workout plans (Bodybuilding, Strength, Endurance, etc.)
INSERT INTO workoutPlan (id, title, objective, duration)
VALUES 
('e688cb3f-1c71-47b5-bd8f-b86d0a73804e', 'Bodybuilding Mass Building', 'Increase muscle mass with hypertrophy training', 12),
('d7c7d466-848b-428f-b441-d271215e38ed', 'Strength Training', 'Focus on power lifting and muscle building', 8),
('afcfcdd9-b9e9-4fe0-bab8-32293e272328', 'Endurance Training', 'Improve cardiovascular health and endurance', 6),
('de283d77-547d-4121-9d47-1a2055a916a1', 'Full Body Strength', 'Build overall strength with compound lifts', 10);

-- Link users to workout plans (Famous athletes and their workout plans)
INSERT INTO userWorkoutPlan (id, userId, workoutPlanId)
VALUES 
('0a77d580-c99d-4902-bac5-d97822816335', 'a4f929d0-e2b6-4a8d-bcc2-dc94b3f38b3e', 'e688cb3f-1c71-47b5-bd8f-b86d0a73804e'),  -- Arnold Schwarzenegger's Bodybuilding plan
('8f4335d2-b58f-42ca-b8b8-b77a24974c0b', 'cc8e7a1a-69e7-4fd7-9253-724b84960255', 'd7c7d466-848b-428f-b441-d271215e38ed'),  -- Jay Cutler's Strength training
('a32fdfdd-46c1-4887-bce5-b27d15ca5c2f', 'f9d9f3a4-2b9f-44b9-b1f0-f953b582ed23', 'afcfcdd9-b9e9-4fe0-bab8-32293e272328'),  -- Dwayne Johnson's Endurance training
('9b703e89-bfbd-48a1-823a-fd6d6165dbde', '6cfa88b9-7e3f-4653-b26f-d2cfc83d059b', 'de283d77-547d-4121-9d47-1a2055a916a1');  -- Kai Greene's Full Body Strength

-- Insert attendance records (Gym attendance for these athletes)
INSERT INTO attendans (id, userId)
VALUES
('b8b8777a-7459-40d7-b2b3-c672973d9120', 'a4f929d0-e2b6-4a8d-bcc2-dc94b3f38b3e'),
('d8ff7c4b-f11c-40ea-8c78-5b571a5fe8b1', 'cc8e7a1a-69e7-4fd7-9253-724b84960255'),
('bff7a1b0-b59d-429d-bd80-b033d544a0d9', 'f9d9f3a4-2b9f-44b9-b1f0-f953b582ed23'),
('53ff0f27-3005-47fb-b201-309ad9a3ecb7', '6cfa88b9-7e3f-4653-b26f-d2cfc83d059b'),
('ae5f4587-cf07-44eb-b586-0530f3b543ec', 'd4b9f45a-8a9b-406d-bbfa-4e7421d913b9');

-- Insert exercises (Gym exercises for strength, hypertrophy, and endurance)
INSERT INTO exercise (id, name, series, reps, rir, rpe, weight)
VALUES
('4a48be91-4bb5-44fe-b925-b913cfc5a6f1', 'Squat', '4', '8-12', '2', '8', '150kg'),
('f597e4f5-b32e-47e7-9cfd-6e5a5591b02c', 'Bench Press', '4', '6-10', '1', '9', '120kg'),
('e21ed0d5-8775-46b0-aef0-4df426f7a30f', 'Deadlift', '3', '4-6', '1', '10', '200kg'),
('e38dbd84-66f9-4f75-baad-178dc3d4db3d', 'Pull-Up', '5', '8-10', NULL, '7', NULL),
('c07fc295-4799-4ab9-bd24-6160b82336fc', 'Leg Press', '3', '12-15', NULL, '8', '180kg'),
('f998db3a-16c1-47c2-8195-7c01a2d2a56b', 'Lunges', '3', '12-15', NULL, '7', '50kg'),
('66f0f34d-e36b-42ba-9d2d-598727bc7e6c', 'Overhead Press', '4', '6-8', '2', '8', '70kg');

-- Insert workouts (Routine details for strength, hypertrophy, etc.)
INSERT INTO workout (id, planId, week, day, description)
VALUES 
('736a7c1e-c401-4d91-bbf7-406789a90f8a', 'e688cb3f-1c71-47b5-bd8f-b86d0a73804e', 1, 1, 'Chest & Shoulders Strength'),
('f6827bc9-c8be-4905-b21b-7056f9be1b89', 'd7c7d466-848b-428f-b441-d271215e38ed', 1, 2, 'Legs Strength'),
('98f549f4-2857-473d-bc9e-bfd1c73be445', 'afcfcdd9-b9e9-4fe0-bab8-32293e272328', 2, 3, 'Endurance Circuit Training'),
('bbb6a870-97a2-40c3-9257-742d845c0c67', 'de283d77-547d-4121-9d47-1a2055a916a1', 1, 4, 'Full Body Compound Lifts');

-- Insert workout exercises (Exercises for different routines)
INSERT INTO workoutExercise (id, workoutId, exerciseId)
VALUES
('a625f338-2542-485b-8152-42cfa8f3ae50', '736a7c1e-c401-4d91-bbf7-406789a90f8a', '4a48be91-4bb5-44fe-b925-b913cfc5a6f1'), -- Squat in Chest & Shoulders Strength
('d441ff19-fbfb-4296-8c9f-e17e2d87f520', 'f6827bc9-c8be-4905-b21b-7056f9be1b89', 'f597e4f5-b32e-47e7-9cfd-6e5a5591b02c'), -- Bench Press in Legs Strength
('f8b72c92-65a5-464f-9576-c153cfcc60a4', '98f549f4-2857-473d-bc9e-bfd1c73be445', 'e21ed0d5-8775-46b0-aef0-4df426f7a30f'), -- Deadlift in Endurance Circuit
('b55d8d60-f83a-4b58-a0b4-396a6c2be5c4', 'bbb6a870-97a2-40c3-9257-742d845c0c67', '66f0f34d-e36b-42ba-9d2d-598727bc7e6c'); -- Overhead Press in Full Body Lifts


-- Insert payments for the users over the last 2-3 months, some skipped
INSERT INTO payments (id, userId, date, amount, timesPerWeek)
VALUES
-- Arnold Schwarzenegger (Paid every month, no skipped months)
('c1f3799f-d94d-4638-b2c6-9a01533c9d27', 'a4f929d0-e2b6-4a8d-bcc2-dc94b3f38b3e', '2024-08-01 00:00:00', 99.99, 4),
('a72c7b91-408a-463b-82d1-e5b02cfcde39', 'a4f929d0-e2b6-4a8d-bcc2-dc94b3f38b3e', '2024-09-01 00:00:00', 99.99, 4),
('f6c99d88-0870-4cbe-bd38-d9293b2692bc', 'a4f929d0-e2b6-4a8d-bcc2-dc94b3f38b3e', '2024-10-01 00:00:00', 99.99, 4),

-- Jay Cutler (Skipped 1 month)
('82e3bb69-8d36-4644-8ec9-cd221876345f', 'cc8e7a1a-69e7-4fd7-9253-724b84960255', '2024-08-15 00:00:00', 120.00, 3),
-- Jay Cutler skipped the payment for September
('20c9d037-b47d-4f5c-a05e-d659b44b34d1', 'cc8e7a1a-69e7-4fd7-9253-724b84960255', '2024-10-15 00:00:00', 120.00, 3),

-- Dwayne Johnson (Paid every month, but skipped one month in between)
('7b10fda3-3e64-4b88-8fe1-5a08a4bb28e9', 'f9d9f3a4-2b9f-44b9-b1f0-f953b582ed23', '2024-08-01 00:00:00', 110.00, 5),
-- Dwayne Johnson skipped payment for September
('5a3b01c3-2da5-4841-bc65-84b06b24a1f7', 'f9d9f3a4-2b9f-44b9-b1f0-f953b582ed23', '2024-10-01 00:00:00', 110.00, 5),

-- Sergio Oliva (Paid for 2 months)
('519ff3ad-d18f-48c3-b39b-825774a8718e', '0c32de4a-9c1d-48ea-a7ad-d7b33207c973', '2024-08-20 00:00:00', 85.00, 3),
('fa3d92cc-cb64-4e5d-b602-625ce68cfb98', '0c32de4a-9c1d-48ea-a7ad-d7b33207c973', '2024-09-20 00:00:00', 85.00, 3),
-- Sergio Oliva skipped October payment
('b2836f83-eed8-4a75-b53d-c9f58047a6b6', '0c32de4a-9c1d-48ea-a7ad-d7b33207c973', '2024-10-20 00:00:00', 85.00, 3),

-- Kai Greene (Paid for every month without skipping)
('ac812a64-f597-4a87-8c27-b24db5330214', '6cfa88b9-7e3f-4653-b26f-d2cfc83d059b', '2024-08-05 00:00:00', 95.00, 4),
('5f40d5b1-847b-4dbd-bc67-e24322a3d0ca', '6cfa88b9-7e3f-4653-b26f-d2cfc83d059b', '2024-09-05 00:00:00', 95.00, 4),
('6f1187f2-5e5d-4421-b041-7f7f77405f02', '6cfa88b9-7e3f-4653-b26f-d2cfc83d059b', '2024-10-05 00:00:00', 95.00, 4),

-- Ronnie Coleman (Missed two months payment, only paid in October)
('25a2e95a-0ea0-47c0-a68c-592aad15e319', 'd4b9f45a-8a9b-406d-bbfa-4e7421d913b9', '2024-08-10 00:00:00', 130.00, 6),
-- Ronnie Coleman skipped September and October payment
('ff10e1e0-16f9-4e19-8a4d-64f80a8f8fe7', 'd4b9f45a-8a9b-406d-bbfa-4e7421d913b9', '2024-10-10 00:00:00', 130.00, 6);