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

    // NOT WORKING
    router.delete('/', async (req, res) => {
        const rcon = tools.getRcon()
        const getWhitelistCommand = "whitelist list"

        // rcon.on('auth', async function () {
        //     try {
        //         // const response = await rcon.send(getWhitelistCommand).then(res => {
        //         //     console.log("Response: " + response)
        //         //     console.log("Res: " + res)
        //         // })
        //         const response = rcon.send(getWhitelistCommand)
        //         console.table(response)
        //         console.log("Whitelist before deletion: " + response)

        //         playerList = tools.getPlayersFromWhitelistResponse(response, ",") // get all player names into an array
        //         console.table(playerList) // debug

        //         // on attend toutes les commandes de delete avec Promise.all
        //         await Promise.all(playerList.map(async player => {
        //             const deleteCommand = "whitelist remove " + player
        //             const response = await rcon.send(deleteCommand)
        //             console.log("Response Delete: " + response)
        //         }));
        //         res.sendStatus(200);

        //     } catch (err) {
        //         console.log("Error: " + err)
        //     }
        // })

        // rcon.on('auth', function () {
        //     // You must wait until this event is fired before sending any commands,
        //     // otherwise those commands will fail.
        //     console.log("Authenticated.")
        //     console.log("Display of the received command: ", JSON.stringify(getWhitelistCommand))
        //     rcon.send(getWhitelistCommand)
        // }).on('response', function (str) {
        //     playerList = tools.getPlayersFromWhitelistResponse(str, ",") // get all player names into an array
        //     console.log("Current whitelist: " + str)
        //     console.table(playerList) // debug
        //     res.send(str)

        //     playerList.forEach(player => {
        //         const deleteCommand = "whitelist remove " + player

        //         rcon.on('auth', function () {
        //             // You must wait until this event is fired before sending any commands,
        //             // otherwise those commands will fail.
        //             console.log("Authenticated.")
        //             console.log("Display of the received command: ", JSON.stringify(deleteCommand))
        //             rcon.send(deleteCommand)
        //         }).on('response', function (str) {
        //             console.log("Response: " + str)
        //             res.send(str)
        //         }).on('error', function (err) {
        //             console.log("Error: " + err)
        //         }).on('end', function () {
        //             console.log("Connection closed.")
        //             res.end()
        //             process.exit()
        //         });

        //         rcon.connect()
        //     });

        // }).on('error', function (err) {
        //     console.log("Error: " + err)
        // }).on('end', function () {
        //     console.log("Connection closed.")
        //     res.end()
        //     process.exit()
        // });

        // rcon.connect()
    })

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