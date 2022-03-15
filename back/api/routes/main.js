const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const rcon = require('rcon');
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports = () => {

    // const app = express();
    /** RCON */
    const options = {
        tcp: true,       // false for UDP, true for TCP (default true)
        challenge: true  // true to use the challenge protocol (default true)
    };

    /** --- Auth routes --- */

    // importing user context
    const User = require("../../model/user");

    // Register
    router.post("/register", async (req, res) => {
        try {
            fs.readFile("../../../../../Custom/src/MinecraftServerAPI/back/data/users.json", async (err, data) => {
                if (err) {
                    console.log(`Error reading file from disk: ${err}`);
                } else {

                    // parse JSON string to JSON object
                    const databases = JSON.parse(data);

                    /** --- Get user imput --- */
                    const { pseudo, password } = req.body;

                    // Verify if this user does not exists
                    let isPseudoExist = false;
                    databases.forEach(user => {
                        if (pseudo == user.pseudo) {
                            isPseudoExist = true
                            return;

                        }
                    });
                    if (isPseudoExist) {
                        return res.status(409).send("This pseudo is already exists. Please enter another pseudo.");
                    }

                    encryptedPassword = await bcrypt.hash(password, 10);

                    // add a new record
                    databases.push({
                        pseudo: pseudo,
                        password: encryptedPassword
                    });

                    // write new data back to the file
                    fs.writeFile("../../../../../Custom/src/MinecraftServerAPI/back/data/users.json", JSON.stringify(databases, null, 4), (err) => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }
                    });
                }
            });
        }
        catch (error) {
            console.log("Error : " + err);
        }
    });

    // Login
    router.post("/login", (req, res) => {

    });

    /** Other routes */
    router.get('/', async (req, res) => {

        res.send("test")
    });

    router.post('/', async (req, res) => {

        let conn = new rcon('mc_serv', 25575, 'rcon', options);
        let r = "salut";

        conn.on('auth', function () {
            // You must wait until this event is fired before sending any commands,
            // otherwise those commands will fail.
            console.log("Authenticated");
            console.log("Affichage de la commande reçue : ", JSON.stringify(req.body.command));
            conn.send(req.body.command);
            // conn.send("help");
        }).on('response', function (str) {
            console.log("Response: " + str);
            res.send(str);
        }).on('error', function (err) {
            console.log("Error: " + err);
        }).on('end', function () {
            console.log("Connection closed");
            process.exit();
        });

        conn.connect();
        // console.log(r);
        // res.send(feedback);
    });

    return router;
};

