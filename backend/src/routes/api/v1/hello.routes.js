const express = require('express');

const db = require('../../../models');
const { User } = db;

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('hola marola');
});

router.get('/world/', (req, res) => {
    res.status(200).send('hola marola pirinola');
});
module.exports = router;