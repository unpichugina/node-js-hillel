import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const db = await mysql.createPool({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/guests', async (req, res) => {
    const {first_name, last_name, email, phone} = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO guests (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, phone]
        );
        res.status(201).json({message: 'Гостя додано', guestId: result.insertId});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


app.get('/rooms/available', async (req, res) => {
    const {date} = req.query;
    try {
        const [rooms] = await db.query(
            `SELECT *
             FROM rooms
             WHERE is_active = 1
               AND id NOT IN (SELECT room_id
                              FROM bookings
                              WHERE ? BETWEEN check_in_date AND check_out_date)`,
            [date]
        );
        res.json(rooms);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/bookings', async (req, res) => {
    const {guest_id, room_id, check_in_date, check_out_date} = req.body;
    try {
        const [room] = await db.execute('SELECT price_per_night FROM rooms WHERE id = ?', [room_id]);
        if (room.length === 0) {
            return res.status(404).json({error: 'Кімната не знайдена'});
        }
        const pricePerNight = room[0].price_per_night;

        const checkIn = new Date(check_in_date);
        const checkOut = new Date(check_out_date);
        const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        if (days <= 0) return res.status(400).json({error: 'Невірні дати'});

        const totalPrice = days * pricePerNight;

        const [result] = await db.execute(
            `INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, total_price)
             VALUES (?, ?, ?, ?, ?)`,
            [guest_id, room_id, check_in_date, check_out_date, totalPrice]
        );

        res.status(201).json({message: 'Бронювання створено', bookingId: result.insertId});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.get('/income', async (req, res) => {
    const {month, year} = req.query;

    if (!month || !year) {
        return res.status(400).json({error: 'Необхідно вказати month і year в запиті'});
    }

    try {
        const [result] = await db.query(
            `SELECT SUM(total_price) AS monthly_income
             FROM bookings
             WHERE MONTH (created_at) = ? AND YEAR (created_at) = ?`,
            [month, year]
        );

        const income = result[0].monthly_income || 0;
        res.json({month, year, income});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
