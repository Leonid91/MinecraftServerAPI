const express = require('express');
const main = require('./routes/main');
const router = express.Router();

module.exports = () => {
    router.use('/main', main());

    return router;
};