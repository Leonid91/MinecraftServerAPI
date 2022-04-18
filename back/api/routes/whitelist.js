const express = require('express');
const router = express.Router();
const tools = require("./../tools/tools.js")

module.exports = () => {
    router.get('/', async (req, res) => {
        const command = "/list"
        // console.log("REACHED: " + command)
        tools.sendCommandRcon(command, res)
    });

    return router;
}