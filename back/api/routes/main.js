const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const rcon = require('rcon');

module.exports = () => {
    /** RCON */
    const options = {
        tcp: true,       // false for UDP, true for TCP (default true)
        challenge: true  // true to use the challenge protocol (default true)
    };

    router.get('/', async (req, res) => {
        
        res.send("test")
    });

    router.post('/', async (req, res) => {

        let conn = new rcon('mc_serv', 25575, 'rcon', options);
        let r = "salut";

            conn.on('auth', function() {
            // You must wait until this event is fired before sending any commands,
            // otherwise those commands will fail.
            console.log("Authenticated");
            console.log("Affichage de la commande reçue : ", JSON.stringify(req.body.command));
            conn.send(req.body.command);
            // conn.send("help");
        }).on('response', function(str) {
            console.log("Response: " + str);
            res.send(str);
        }).on('error', function(err) {
            console.log("Error: " + err);
        }).on('end', function() {
            console.log("Connection closed");
            process.exit();
        });

        conn.connect();
        // console.log(r);
        // res.send(feedback);
    });

    return router;
};

