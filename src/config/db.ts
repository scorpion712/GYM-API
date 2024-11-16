import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config(); 

const pool = mysql.createPool({
  host: process.env.DATABASE_URL, // The hostname of your database server
  port: parseInt(process.env.DATABASE_PORT ?? "3306"), // MySQL default port is 3306
  user: process.env.DATABASE_USER, // Your database user
  password: process.env.DATABASE_PASSWORD, // Your database password
  database: process.env.DATABASE_NAME, // Your database name
}); 

// Promisify the pool to use async/await syntax
const promisePool = pool.promise();

export default promisePool;