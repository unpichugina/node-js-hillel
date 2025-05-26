const express = require('express');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use(express.json());

app.use('/', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
