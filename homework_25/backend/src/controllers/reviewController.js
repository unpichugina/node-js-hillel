const db = require('../db/pool');

exports.getAllReviews = async (req, res) => {
    try {
        const [reviews] = await db.query(`
            SELECT reviews.id, message, rating, reviews.created_at, users.email AS author
            FROM reviews
                     JOIN users ON reviews.user_id = users.id
        `);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getReviewById = async (req, res) => {
    const {id} = req.params;
    try {
        const [reviews] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
        const review = reviews[0];
        if (!review) return res.status(404).json({message: 'Review not found'});
        res.json(review);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.createReview = async (req, res) => {
    const {message, rating} = req.body;
    const userId = req.user.id;
    try {
        await db.execute(
            'INSERT INTO reviews (user_id, message, rating) VALUES (?, ?, ?)',
            [userId, message, rating]
        );
        res.status(201).json({message: 'Review added'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.updateReview = async (req, res) => {
    const {id} = req.params;
    const {message, rating} = req.body;
    const userId = req.user.id;
    try {
        const [result] = await db.query('SELECT user_id FROM reviews WHERE id = ?', [id]);
        if (!result[0] || result[0].user_id !== userId) {
            return res.status(403).json({message: 'Not allowed'});
        }

        await db.execute('UPDATE reviews SET message = ?, rating = ? WHERE id = ?', [message, rating, id]);
        res.json({message: 'Review updated'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.deleteReview = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id;
    try {
        const [result] = await db.query('SELECT user_id FROM reviews WHERE id = ?', [id]);
        if (!result[0] || result[0].user_id !== userId) {
            return res.status(403).json({message: 'Not allowed'});
        }

        await db.execute('DELETE FROM reviews WHERE id = ?', [id]);
        res.json({message: 'Review deleted'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
