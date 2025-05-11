require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function seed() {
    try {
        await client.connect();
        const db = client.db();

        const categories = [
            {_id: new ObjectId(), name: 'Smartphones'},
            {_id: new ObjectId(), name: 'Laptops'},
            {_id: new ObjectId(), name: 'Accessories'}
        ];

        const products = [
            {
                name: 'iPhone 15',
                categoryId: categories[0]._id,
                price: 1299,
                stock: 50,
                sales: 0
            },
            {
                name: 'Samsung Galaxy S23',
                categoryId: categories[0]._id,
                price: 999,
                stock: 40,
                sales: 0
            },
            {
                name: 'MacBook Pro 14',
                categoryId: categories[1]._id,
                price: 2399,
                stock: 25,
                sales: 0
            },
            {
                name: 'Wireless Charger',
                categoryId: categories[2]._id,
                price: 49,
                stock: 100,
                sales: 0
            }
        ];

        await db.collection('categories').deleteMany({});
        await db.collection('products').deleteMany({});

        await db.collection('categories').insertMany(categories);
        await db.collection('products').insertMany(products);

        console.log('Seed data inserted successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await client.close();
    }
}

seed();
