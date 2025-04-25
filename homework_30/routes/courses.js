import { Router } from 'express';
const router = Router();

export default router;

router.get('/student-count', async (req, res) => {
  const [result] = await req.db.query(`
    SELECT c.title, COUNT(e.student_id) AS student_count
    FROM courses c
    LEFT JOIN enrollments e ON c.id = e.course_id
    GROUP BY c.id
  `);
  res.json(result);
});

router.get('/high-average', async (req, res) => {
  const [result] = await req.db.query(`
    SELECT c.title, AVG(e.grade) AS average_grade
    FROM courses c
    JOIN enrollments e ON c.id = e.course_id
    GROUP BY c.id
    HAVING AVG(e.grade) > 85
  `);
  res.json(result);
});
