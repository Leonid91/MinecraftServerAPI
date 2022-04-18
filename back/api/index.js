const express = require('express');
// const auth = require('../middleware/auth');
const main = require('./routes/main');
const inventory = require('./routes/inventory');
const whitelist = require('./routes/whitelist');
const rcon = require('./routes/rcon');
const router = express.Router();

module.exports = () => {
    router.use('/main', main());
    router.use('/whitelist', whitelist());
    router.use('/rcon', rcon());
    router.use('/inventory', inventory());

    return router;
};