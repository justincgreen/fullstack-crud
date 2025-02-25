import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the connection with Promises for async/await
const promiseDb = db.promise();
export default promiseDb;