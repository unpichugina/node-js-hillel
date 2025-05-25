# Hotel Booking System API (MySQL)

This project is a backend API for a hotel booking system, built with Node.js, Express, and MySQL. 
It supports guest registration, room booking, and availability checks.

---

## Description

This RESTful API is designed to handle hotel operations including:

- Adding new guests
- Booking rooms
- Viewing available rooms
- Calculating hotel revenue

Database schema includes:
- `Guests`
- `Rooms`
- `Bookings`

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- Docker & docker-compose

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/unpichugina/node-js-hillel.git
cd node-js-hillel/homework_25
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` file as needed:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hotel
```

---

## Docker Setup

If you prefer Docker:

```bash
docker-compose up -d
```

This will start a MySQL container with the configured database.

To seed the database:

```bash
docker exec -i <container_name> mysql -uroot -p<password> hotel < dump.sql
docker exec -i <container_name> mysql -uroot -p<password> hotel < dump_data.sql
```

---

## Running the App

```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## Sample SQL Queries

### Available rooms on 2025-04-20

```sql
SELECT * FROM rooms r
WHERE r.id NOT IN (
  SELECT room_id FROM bookings
  WHERE '2025-04-20' BETWEEN check_in AND check_out
);
```

### Add a new guest

```sql
INSERT INTO guests (name, email, phone)
VALUES ('John Doe', 'john@example.com', '123456789');
```

### Book a room for a guest

```sql
INSERT INTO bookings (guest_id, room_id, check_in, check_out)
VALUES (1, 2, '2025-04-20', '2025-04-25');
```

### Calculate revenue for a month

```sql
SELECT SUM(price) AS monthly_revenue
FROM bookings
JOIN rooms ON bookings.room_id = rooms.id
WHERE MONTH(check_in) = 4 AND YEAR(check_in) = 2025;
```

---

## Project Structure

```
homework_25/products
├── server.js
├── dump.sql
├── dump_data.sql
├── docker-compose.yml
├── .env.example
├── .env
├── package.json
└── db-diagram.png
```

---

## License

This project is licensed under the MIT License.

## Author

- [GitHub](https://github.com/unpichugina)
