const express = require('express');
const router = express.Router();
const tools = require("./../tools/tools.js")

module.exports = () => {
    // Get all the items from a player inventory
    router.get('/player', async (req, res) => {
        const command = "/data get entity " + req.body.player + " Inventory" 
        tools.sendCommandRcon(command, res)
    });

    // Give a list of items to a player
    // NOT WORKING
    router.post('/player', async (req, res) => {
        const command = ""
        tools.sendCommandRcon(command, res)
    });

    // Modify the whole inventory of the player
    // NOT WORKING
    // same problem as with delete whitelist

    // Empty an inventory
    router.delete('/player', async (req, res) => {
        const command = "clear " + req.body.player
        tools.sendCommandRcon(command, res)
    });

    // Remove an item from a player inventory
    router.delete('/player/item', async (req, res) => {
        const command = "clear " + req.body.player + " " + req.body.item + " " + req.body.amount
        tools.sendCommandRcon(command, res)
    });

    return router;
}