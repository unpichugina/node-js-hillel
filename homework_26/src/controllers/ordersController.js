const connect = require('../db');
const {ObjectId} = require('mongodb');

exports.getAllOrders = async (req, res) => {
    const db = await connect();
    const orders = await db.collection('orders').find().toArray();
    res.json(orders);
};

exports.createOrder = async (req, res) => {
    const db = await connect();
    const {customer, items} = req.body;

    const productsCollection = db.collection('products');
    const ordersCollection = db.collection('orders');

    let total = 0;

    for (const item of items) {
        const product = await productsCollection.findOne({_id: new ObjectId(item.productId)});
        if (!product || product.stock < item.quantity) {
            return res.status(400).json({error: 'Product not available or out of stock'});
        }
        total += product.price * item.quantity;

        // Update stock and sales
        await productsCollection.updateOne(
            {_id: product._id},
            {
                $inc: {
                    stock: -item.quantity,
                    sales: item.quantity
                }
            }
        );
    }

    const order = {
        customer,
        items: items.map(i => ({...i, productId: new ObjectId(i.productId)})),
        total,
        createdAt: new Date()
    };

    const result = await ordersCollection.insertOne(order);
    res.json(result);
};


exports.getTotalRevenue = async (req, res) => {
    const db = await connect();
    const result = await db.collection('orders').aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: {$sum: "$total"}
            }
        }
    ]).toArray();

    res.json(result[0] || {totalRevenue: 0});
};
