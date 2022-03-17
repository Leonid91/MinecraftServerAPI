const express = require('express');
// const auth = require('../middleware/auth');
const main = require('./routes/main');
const whitelist = require('./routes/whitelist');
const router = express.Router();

module.exports = () => {
    router.use('/main', main());
    router.use('/whitelist', whitelist());

    return router;
};