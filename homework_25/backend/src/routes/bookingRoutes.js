const express = require('express');
const {
    createGuest,
    getAvailableRooms,
    createBooking,
    getIncome,
    getMyBookings
} = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/guests', authenticateToken, createGuest);
router.get('/rooms/available', authenticateToken, getAvailableRooms);
router.post('/bookings', authenticateToken, createBooking);
router.get('/income', authenticateToken, getIncome);
router.get('/bookings/my', authenticateToken, getMyBookings);


module.exports = router;
