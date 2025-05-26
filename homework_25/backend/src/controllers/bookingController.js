const db = require('../db/pool');

exports.createGuest = async (req, res) => {
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
};

exports.getAvailableRooms = async (req, res) => {
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
};

exports.createBooking = async (req, res) => {
    const {guest_id, room_id, check_in_date, check_out_date} = req.body;
    try {
        const [room] = await db.execute(
            'SELECT price_per_night FROM rooms WHERE id = ?',
            [room_id]
        );

        if (room.length === 0) {
            return res.status(404).json({error: 'Кімната не знайдена'});
        }

        const pricePerNight = room[0].price_per_night;
        const checkIn = new Date(check_in_date);
        const checkOut = new Date(check_out_date);
        const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

        if (days <= 0) {
            return res.status(400).json({error: 'Невірні дати'});
        }

        const totalPrice = days * pricePerNight;

        const [result] = await db.execute(
            `INSERT INTO bookings
                 (guest_id, room_id, check_in_date, check_out_date, total_price)
             VALUES (?, ?, ?, ?, ?)`,
            [guest_id, room_id, check_in_date, check_out_date, totalPrice]
        );

        res.status(201).json({message: 'Бронювання створено', bookingId: result.insertId});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getIncome = async (req, res) => {
    try {
        const [result] = await db.query('SELECT SUM(total_price) AS total_income FROM bookings');
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getMyBookings = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.query(
            `SELECT b.*, r.room_number
             FROM bookings b
                      JOIN rooms r ON b.room_id = r.id
             WHERE b.guest_id = ?
             ORDER BY b.created_at DESC`,
            [userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};