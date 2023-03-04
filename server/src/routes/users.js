const express = require('express');
const router = express.Router();

const users = require('../utils/dummyUser');

router.get('/', (req, res) => {
    res.json(users);
});

module.exports = router;
