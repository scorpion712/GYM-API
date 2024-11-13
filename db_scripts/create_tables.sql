-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workoutPlan;
DROP TABLE IF EXISTS userWorkoutPlan;
DROP TABLE IF EXISTS attendans;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS workout;
DROP TABLE IF EXISTS workoutExercise;-- -------------------
--  CREATE TABLES   --
-- ------------------- 

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    age INT(2) NULL DEFAULT NULL,
    phone VARCHAR(13) NULL DEFAULT NULL,
    email VARCHAR(200) NULL DEFAULT NULL,
    idNumber VARCHAR(9) NULL DEFAULT NULL,
    considerations VARCHAR(255) NULL DEFAULT NULL,
    daysPerWeek INT(1) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    deletedAt TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,  -- Ensure that userId cannot be NULL
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    amount DOUBLE NOT NULL,
    timesPerWeek INT NOT NULL,
    CONSTRAINT FK_PAYMENTS_USERS
        FOREIGN KEY (userId) 
        REFERENCES users(id)
        ON UPDATE CASCADE   -- Cascade updates when the referenced id in users changes
        ON DELETE RESTRICT   -- Prevent deletion of a user that is referenced in payments
);

CREATE TABLE workoutPlan (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    objective VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    init_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE userWorkoutPlan (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    workoutPlanId VARCHAR(36) NOT NULL,
    CONSTRAINT FK_USERWORKOUTPLAN_USERS
    	FOREIGN KEY (userId)
    	REFERENCES users(id)
    	ON UPDATE CASCADE
    	ON DELETE CASCADE,
    CONSTRAINT FK_USERWORKOUTPLAN_WORKOUTPLAN
    	FOREIGN KEY (workoutPlanId)
    	REFERENCES workoutPlan(id)
    	ON UPDATE CASCADE
    	ON DELETE CASCADE
);

CREATE TABLE attendans (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_ATTENDANDS_USERS
		FOREIGN KEY (userId)
        REFERENCES users(id)
        ON UPDATE CASCADE   -- Cascade updates when the referenced id in users changes
        ON DELETE RESTRICT   -- Prevent deletion of a user that is referenced in payments
);

CREATE TABLE exercise (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    series VARCHAR(20) NOT NULL,
    reps VARCHAR(50) NOT NULL,
    rir VARCHAR(10) NULL DEFAULT NULL,
    rpe VARCHAR(10) NULL DEFAULT NULL,
    weight VARCHAR(10) NULL DEFAULT NULL,
    comments VARCHAR(100) NULL DEFAULT NULL
);


CREATE TABLE workout (
    id VARCHAR(36) PRIMARY KEY,
    planId VARCHAR(36) NOT NULL,
    week INT NOT NULL,
    day INT NOT NULL,
    description VARCHAR(50) NULL DEFAULT NULL,
	CONSTRAINT FK_WORKOUT_PLAN
		FOREIGN KEY (planId)
        REFERENCES workoutPlan(id)
        ON UPDATE CASCADE   -- Cascade updates when the referenced id in users changes
        ON DELETE CASCADE   -- Prevent deletion of a user that is referenced in payments
);

CREATE TABLE workoutExercise (
    id VARCHAR(36) PRIMARY KEY,
    workoutId VARCHAR(36) NOT NULL,
    exerciseId VARCHAR(36) NOT NULL,
	CONSTRAINT FK_WORKOUTEXERCISE_EXERCISE
		FOREIGN KEY (exerciseId)
        REFERENCES exercise(id)
        ON UPDATE CASCADE   -- Cascade updates when the referenced id in users changes
        ON DELETE CASCADE   -- Prevent deletion of a user that is referenced in payments
);