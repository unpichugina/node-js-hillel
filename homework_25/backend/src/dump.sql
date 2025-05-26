CREATE DATABASE IF NOT EXISTS hotel_booking;
USE hotel_booking;

CREATE TABLE IF NOT EXISTS guests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  room_number VARCHAR(255),
  room_type VARCHAR(255),
  price_per_night DECIMAL(10, 2),
  is_active BOOLEAN
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  guest_id INT,
  room_id INT,
  check_in_date DATE,
  check_out_date DATE,
  total_price DECIMAL(10, 2),
  created_at DATETIME,
  FOREIGN KEY (guest_id) REFERENCES guests(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO guests (first_name, last_name, email, phone)
VALUES ('Анна', 'Коваленко', 'anna.koval@example.com', '+380981234567');

INSERT INTO rooms (room_number, room_type, price_per_night, is_active)
VALUES
  ('401', 'Standard', 120.00, 1),
  ('400', 'Standard', 120.00, 1);

INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, total_price, created_at)
VALUES
  (1, 1, '2025-04-20', '2025-04-22', 240.00, '2025-04-10 10:00:00');
