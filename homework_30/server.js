import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import studentsRouter from './routes/students.js';
import coursesRouter from './routes/courses.js';

dotenv.config();

const app = express();
app.use(express.json());

const db = await mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер онлайн-курсів працює на порту ${PORT}`);
});
