const connect = require('../db');


exports.getAll = async (req, res) => {
    const db = await connect();
    const students = await db.collection('students').find().toArray();
    res.json(students);
};

exports.create = async (req, res) => {
    const db = await connect();
    const result = await db.collection('students').insertOne(req.body);
    res.json(result);
};

exports.updateAge = async (req, res) => {
    const db = await connect();
    const result = await db.collection('students').updateOne(
        {name: req.params.name},
        {$set: {age: req.body.age}}
    );
    res.json(result);
};

exports.deleteByGroupAndName = async (req, res) => {
    const db = await connect();
    const {group, name} = req.params;

    const result = await db.collection('students').deleteOne({
        group,
        name
    });

    if (result.deletedCount === 0) {
        return res.status(404).json({message: 'Student not found in specified group'});
    }

    res.json({message: `Deleted ${name} from group ${group}`});
};

exports.filter = async (req, res) => {
    const db = await connect();
    const students = await db.collection('students').find({
        $and: [
            {age: {$gt: 20}},
            {marks: {$elemMatch: {$gt: 85}}},
            {name: {$regex: '^A', $options: 'i'}}
        ]
    }).toArray();
    res.json(students);
};

exports.sort = async (req, res) => {
    const db = await connect();
    const students = await db.collection('students')
        .find()
        .sort({age: -1})
        .toArray();
    res.json(students);
};

exports.studentAverages = async (req, res) => {
    const db = await connect();
    const result = await db.collection('students').aggregate([
        {
            $project: {
                name: 1,
                group: 1,
                avgMark: {$avg: "$marks"}
            }
        }
    ]).toArray();
    res.json(result);
};

exports.groupByGroup = async (req, res) => {
    const db = await connect();
    const result = await db.collection('students').aggregate([
        {
            $group: {
                _id: "$group",
                count: {$sum: 1}
            }
        }
    ]).toArray();
    res.json(result);
};

exports.totalAverage = async (req, res) => {
    const db = await connect();
    const result = await db.collection('students').aggregate([
        {$unwind: "$marks"},
        {
            $group: {
                _id: null,
                average: {$avg: "$marks"}
            }
        }
    ]).toArray();
    res.json(result[0]);
};
