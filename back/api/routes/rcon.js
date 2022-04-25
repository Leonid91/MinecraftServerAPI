const express = require('express');
const router = express.Router();
const tools = require("./../tools/tools.js")

module.exports = () => {
    router.post('/', async (req, res) => {
        tools.sendCommandRcon(req.body.command, res)
    });

    router.get('/', async (req, res) => {
        const testCommand = "list"
        tools.sendCommandRcon(testCommand, res)
    });

    return router;
}