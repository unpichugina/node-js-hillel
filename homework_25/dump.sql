CREATE TABLE `guests` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `phone` varchar(255)
);

CREATE TABLE `rooms` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_number` varchar(255),
  `room_type` varchar(255),
  `price_per_night` decimal,
  `is_active` boolean
);

CREATE TABLE `bookings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `guest_id` int,
  `room_id` int,
  `check_in_date` date,
  `check_out_date` date,
  `total_price` decimal,
  `created_at` datetime
);

ALTER TABLE `bookings` ADD FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`);

ALTER TABLE `bookings` ADD FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);
