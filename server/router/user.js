//-----------------------------
// Load Libraries
//-----------------------------
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();

const config = require('../config');
const db = require('../utils/mysql_utils');

//-----------------------------
// Configuration
//-----------------------------
// Body Parser
const urlencoded = express.urlencoded({ extended: true });

// MySQL
const pool = mysql.createPool(config.mysql);

const GET_ALL_USERS = `select * from users`;
const FIND_USER = `select * from users where email = ?`;

const getAllUsers = db.mkQueryFromPool(db.mkQuery(GET_ALL_USERS), pool);
const findUser = db.mkQueryFromPool(db.mkQuery(FIND_USER), pool);

// Mongo Client
const client = new MongoClient(config.mongodb.url, { useUnifiedTopology: true });

//-----------------------------
// Router rules
//-----------------------------
// Get all user is only valid for admin role
router.get('/', (req, res) => {
    getAllUsers()
        .then(result => {
            if (!result.length)
                return res.status(404).json({
                    message: 'Not found',
                    url: req.originalUrl,
                    status: 404
                })

            res.status(200).json(result);
        })
})

// Find all customers 
router.get('/customers',
    (req, res) => {
        // const userId; // get from jwt token in req
        const skip = req.query.start || 0;
        const limit = req.query.size || 20;

        client.db('fitness').collection('customers').find(
            {
                $and: [
                    // { user_id: userId || null},
                    { deleted: false }
                ]
            })
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(result => {
                if (!result.length)
                    return res.status(404).json({
                        message: 'not found',
                        url: req.originalUrl,
                        status: 404
                    })

                console.info('Customers results: ', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'retrieve error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

router.post('/customer', urlencoded,
    (req, res) => {
        const body = req.body;
        const now = new Date();

        client.db('fitness').collection('customers').insertOne({
            name: body.name,
            user_id: body.user_id,  // this should get from JWT
            height: body.height,
            age: body.age,
            gender: body.gender,
            phone: body.phone,
            deleted: false,
            records: [],
            images: []
        })
            .then(result => {
                console.info('Add customer result: ', result.ops);
                res.status(201).json({
                    message: 'new customer added',
                    url: req.originalUrl,
                    status: 201
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'server error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

router.put('/customers/:custId', urlencoded,
    (req, res) => {
        const userId = '' // TODO: retrieve from JWT token in req
        const custId = req.params.custId;
        const body = req.body;
        const now = new Date();

        client.db('fitness').collection('customers').updateOne(
            {
                $and: [
                    { _id: ObjectId(custId) },
                    { user_id: userId }
                ]
            },
            {
                $set: {
                    name: body.name,
                    height: body.height,
                    age: body.age,
                    gender: body.gender,
                    phone: body.phone
                }
            })
            .then(result => {
                console.info(`Update customer(${custId}) count: `, result.matchedCount);
                res.status(201).json({
                    message: 'update successful',
                    url: req.originalUrl,
                    status: 200
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'server error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

router.delete('/customers/:custId',
    (req, res) => {
        const custId = req.params.custId;
        // const userId; // get from jwt token in req

        client('fitness').collection('customers').updateOne(
            {
                $and: [
                    { _id: ObjectId(recordId) },
                    // { user_id: userId },
                    { deleted: false }
                ]
            },
            {
                $set: { deleted: true }
            })
            .then(result => {
                console.info(`>>> delete ${recordId} count: `, result.modifiedCount);
                res.status(200).json({
                    message: 'deleted',
                    url: req.originalUrl,
                    status: 200
                })
            }).catch(err => {
                console.error(`>>> delete ${recordId} error: `, err);
                res.status(500).json({
                    message: 'delete error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

// Find customer detail including records from a customer by id
router.get('/customers/:custId',
    (req, res) => {
        const custId = req.params.custId;
        const skip = req.query.start || 0;
        const limit = req.query.size || 10;

        client.db('fitness').collection('records').find(
            {
                $and: [
                    { cust_id: custId },
                    { deleted: false }
                ]
            })
            .sort({
                updated_on: 1   // ascending
            })
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(result => {
                if (!result.length)
                    return res.status(404).json({
                        message: 'not found',
                        url: req.originalUrl,
                        status: 404
                    })
                console.info(`CustId(${custId}) records: `, result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'retrieve error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

// Insert new record for a customer by id
router.post('/:custId/record', urlencoded,
    (req, res) => {
        const custId = req.params.custId;
        const body = req.body;
        const now = new Date();

        client.db('fitness').collection('records').insertOne(
            {
                cust_id: custId,
                weight: body.weight,
                fat_percentage: body.fat_percentage,
                visceral_fat: body.visceral_fat,
                bmi: body.bmi,
                metabolism: body.metabolism,
                muscle_percentage: body.muscle_percentage,
                body_age: body.body_age,
                updated_on: now,
                recorded_date: body.recorded_date,
                deleted: false
            }
        ).then(result => {
            res.status(201).json({
                message: 'inserted',
                url: req.originalUrl,
                status: 201
            })
        }).catch(err => {
            res.status(500).json({
                message: 'inserted error',
                url: req.originalUrl,
                status: 500
            })
        })
    }
)

// Find one record by id
router.get('/records/:id', (req, res) => {
    const recordId = req.params.id;

    client.db('fitness').collection('records').findOne(
        {
            _id: ObjectId(recordId)
        })
        .then(result => {
            if (!result.length)
                return res.status(404).json({
                    message: 'not found',
                    url: req.originalUrl,
                    status: 404
                })

            res.status(200).json({
                message: 'find one',
                url: req.originalUrl,
                status: 200
            })
        }).catch(err => {
            console.error(`>>> delete ${recordId} error: `, err);
            res.status(500).json({
                message: 'find one error',
                url: req.originalUrl,
                status: 500
            })
        })
})

// Update a record by id
router.put('/records/:id', urlencoded,
    (req, res) => {
        const recordId = req.params.id;
        const body = req.body;
        const now = new Date();

        client.db('fitness').collection('records').updateOne(
            { _id: ObjectId(recordId) },
            {
                $set: {
                    weight: body.weight,
                    fat_percentage: body.fat_percentage,
                    visceral_fat: body.visceral_fat,
                    bmi: body.bmi,
                    metabolism: body.metabolism,
                    muscle_percentage: body.muscle_percentage,
                    body_age: body.body_age,
                    updated_on: now,
                    recorded_date: body.recorded_date,
                    deleted: false
                }
            })
            .then(result => {
                console.info(`>>> updated ${recordId} count: `, result.modifiedCount);
                res.status(200).json({
                    message: 'updated',
                    url: req.originalUrl,
                    status: 200
                })
            }).catch(err => {
                console.error(`>>> updated ${recordId} error: `, err);
                res.status(500).json({
                    message: 'update error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

// Soft delete a record by id
router.delete('/records/:id',
    (req, res) => {
        const recordId = req.params.id;
        client.db('fitness').collection('records').updateOne(
            {
                $and: [
                    { _id: ObjectId(recordId) },
                    { deleted: false }
                ]
            },
            {
                $set: { deleted: true }
            })
            .then(result => {
                console.info(`>>> delete ${recordId} count: `, result.modifiedCount);
                res.status(200).json({
                    message: 'deleted',
                    url: req.originalUrl,
                    status: 200
                })
            }).catch(err => {
                console.error(`>>> delete ${recordId} error: `, err);
                res.status(500).json({
                    message: 'delete error',
                    url: req.originalUrl,
                    status: 500
                })
            })
    }
)

//-----------------------------
// Connections
//-----------------------------
const poolConn = () => {
    return (
        new Promise((resolve, reject) => {
            pool.getConnection(
                (err, conn) => {
                    if (err) {
                        console.error('Cannot get database: ', err);
                        reject(err)
                    }
                    conn.ping(err => {
                        if (err)
                            return reject(err);
                        resolve();
                    })
                })
        })
    )
}

const clientConn = () => {
    return (
        new Promise((resolve, reject) => {
            client.connect((err, _) => {
                if (err) {
                    console.error('>>> Could not connect to MongoDB database: ', err);
                    reject(err);
                }

                resolve(null);
            })
        })
    )
}

const connections = {
    pool: poolConn,
    client: clientConn
}

module.exports = { router, connections };