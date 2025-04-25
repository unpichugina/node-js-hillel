import { Router } from 'express';
const router = Router();

export default router;

router.get('/average-grades', async (req, res) => {
  const [result] = await req.db.query(`
    SELECT s.first_name, s.last_name, AVG(e.grade) AS average_grade
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    GROUP BY s.id
  `);
  res.json(result);
});

router.get('/sql-basics', async (req, res) => {
  const [result] = await req.db.query(`
    SELECT s.first_name, s.last_name
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    JOIN courses c ON c.id = e.course_id
    WHERE c.title = 'SQL Basics'
  `);
  res.json(result);
});

router.get('/top', async (req, res) => {
  const [result] = await req.db.query(`
    SELECT s.first_name, s.last_name, AVG(e.grade) AS avg_grade
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    GROUP BY s.id
    ORDER BY avg_grade DESC
    LIMIT 1
  `);
  res.json(result[0]);
});

