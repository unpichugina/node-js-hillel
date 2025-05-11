require('dotenv').config();
const {MongoClient} = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const students = [
    {name: "Ivan", age: 21, group: "A-31", marks: [75, 90, 82]},
    {name: "Anna", age: 22, group: "B-21", marks: [88, 92, 85]},
    {name: "Petro", age: 19, group: "A-31", marks: [70, 65, 80]},
    {name: "Andrii", age: 23, group: "B-21", marks: [95, 91, 89]},
    {name: "Oksana", age: 20, group: "C-12", marks: [78, 82, 76]}
];

async function seed() {
    try {
        await client.connect();
        const db = client.db();
        await db.collection('students').deleteMany({});
        await db.collection('students').insertMany(students);
        console.log('Seed data inserted');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seed();
