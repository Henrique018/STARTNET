import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export const db = async (): Promise<mysql.Connection> => {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'STARTNET',
  });
};
console.log('database connected!');
