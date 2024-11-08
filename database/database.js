import mysql from 'mysql2';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0,
  connectTimeout: 10000, // Nuevo
  keepAliveInitialDelay: 10000, // Nuevo
});

export const databaseExecute = async (query, data = null) => {
  try {
    const [rows] = await (data ? pool.promise().query(query, data) : pool.promise().query(query));
    return rows;
  } catch (error) {
    console.error('Error al realizar la Consulta a la Base de Datos: ', error);
    return false;
  }
};
