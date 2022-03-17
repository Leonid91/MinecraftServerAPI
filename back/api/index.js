const express = require('express');
const auth = require('../middleware/auth');
const main = require('./routes/main');
const router = express.Router();

module.exports = () => {
    router.use('/main', main());

    return router;
};