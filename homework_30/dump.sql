CREATE DATABASE IF NOT EXISTS online_courses
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE online_courses;

DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    last_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    email VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO students (id, first_name, last_name, email) VALUES
(1, 'Олег', 'Шевченко', 'oleg@example.com'),
(2, 'Марія', 'Коваль', 'maria@example.com'),
(3, 'Ігор', 'Іваненко', 'ihor@example.com');

INSERT INTO courses (id, title, description) VALUES
(1, 'SQL Basics', 'Основи SQL'),
(2, 'JavaScript 101', 'Вступ до JavaScript'),
(3, 'Data Structures', 'Структури даних');

INSERT INTO enrollments (id, student_id, course_id, grade) VALUES
(1, 1, 1, 90),
(2, 1, 2, 85),
(3, 2, 1, 80),
(4, 2, 3, 95),
(5, 3, 2, 88);
