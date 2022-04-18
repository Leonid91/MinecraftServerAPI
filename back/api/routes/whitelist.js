const express = require('express');
const router = express.Router();
const tools = require("./../tools/tools.js")

module.exports = () => {
    let playerList = []

    // get whitelist
    router.get('/', async (req, res) => {
        const command = "whitelist list"
        tools.sendCommandRcon(command, res)
    });

    // empty whitelist
    router.delete('/', async (req, res) => {
        const command = "whitelist list"

        const conn = tools.connectRcon()

        conn.on('auth', function () {
            console.log("Authenticated.")
            console.log("Display of the received command: ", JSON.stringify(command))
            conn.send(command)
        }).on('response', function (str) {
            console.log("Response: " + str)

            playerList = tools.getArrayFromString(str) // get all player names into an array
            // console.table(playerList)

            res.cookie("playerList", playerList)

            res.send(str)
        }).on('error', function (err) {
            console.log("Error: " + err)
        }).on('end', function () {
            console.log("Connection closed.")
            res.end()
            process.exit()
        });

        conn.connect()
        console.log(res.cookie)
    });

    // reload whitelist
    router.post('/', async (req, res) => {
        const command = "whitelist reload" //
        tools.sendCommandRcon(command, res)
    });

    // return if a player is whitelisted or not
    router.get('/player', async (req, res) => {
        // TODO same problem as with delete all whitelist
        const commandGetPlayers = "whitelist list" // ça c'est juste pour récupérer les joueurs
        tools.sendCommandRcon(commandGetPlayers, res)
    });

    // add a player
    router.post('/player', async (req, res) => {
        const command = "whitelist add " + req.body.username
        tools.sendCommandRcon(command, res)
    });

    // remove a player
    router.delete('/player', async (req, res) => {
        const command = "whitelist remove " + req.body.username
        tools.sendCommandRcon(command, res)
    });

    // enable/disable a player
    router.post('/enable', async (req, res) => {
        const command = "whitelist " + req.body.enable
        tools.sendCommandRcon(command, res)
    });

    return router;
}