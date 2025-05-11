const connect = require('../db');

exports.createProduct = async (req, res) => {
    const db = await connect();
    const result = await db.collection('products').insertOne(req.body);
    res.json(result);
};

exports.getAllProducts = async (req, res) => {
    const db = await connect();
    const categoryName = req.query.category;

    if (categoryName) {
        const category = await db.collection('categories').findOne({name: categoryName});
        if (!category) return res.status(404).json({error: 'Category not found'});

        const products = await db.collection('products').find({categoryId: category._id}).toArray();
        return res.json(products);
    }

    const products = await db.collection('products').find().toArray();
    res.json(products);
};

exports.getTopProducts = async (req, res) => {
    const db = await connect();
    const products = await db.collection('products')
        .find()
        .sort({sales: -1})
        .limit(3)
        .toArray();
    res.json(products);
};
