const connect = require('../db');

exports.getAllCategories = async (req, res) => {
    const db = await connect();
    const categories = await db.collection('categories').find().toArray();
    res.json(categories);
};

exports.createCategory = async (req, res) => {
    const db = await connect();
    const result = await db.collection('categories').insertOne(req.body);
    res.json(result);
};
