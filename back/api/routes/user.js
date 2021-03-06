const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const rcon = require('rcon');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Console } = require('console');
const auth = require('../../middleware/auth');
const res = require('express/lib/response');
const tools = require("./../tools/tools.js")
require("dotenv").config();

module.exports = () => {
    const jwtKey = "my_secret_key"

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
                    const { username, password } = req.body

                    // Verify if this user does not exists
                    let isUsernameExist = false;
                    databases.forEach(user => {
                        if (username == user.username) {
                            isUsernameExist = true
                            return;
                        }
                    });
                    if (isUsernameExist) {
                        return res.status(409).send("This username is already exists. Please enter another username.");
                    }

                    encryptedPassword = await bcrypt.hash(password, 10);

                    // add a new record
                    databases.push({
                        username: username,
                        password: encryptedPassword,
                    });

                    // write new data back to the file
                    fs.writeFile("../../../../../Custom/src/MinecraftServerAPI/back/data/users.json", JSON.stringify(databases, null, 4), (err) => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }

                        // Create a new token with the username in the payload
                        const token = jwt.sign({ username }, jwtKey, {
                            algorithm: "HS256"
                        })

                        res.cookie("token", token)
                        res.end()
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
        try {
            fs.readFile("../../../../../Custom/src/MinecraftServerAPI/back/data/users.json", async (err, data) => {
                if (err) {
                    console.log(`Error reading file from disk: ${err}`)
                    return
                }

                /** --- To switch between password and JWT auth --- */
                let isPasswordAuth = false;

                /** --- Get data from user database --- */
                const userData = JSON.parse(data)

                /** --- Get user input --- */
                const username = req.body.username
                const password = req.body.password

                // Verify password
                let isUserVerified = false

                userData.forEach(usr => {
                    if (bcrypt.compareSync(req.body.password, usr.password) && req.body.username == usr.username) {
                        isUserVerified = true
                    }
                });

                if (!isUserVerified) {
                    res.status(409).send("Wrong username or password.")
                    res.end()
                    return
                }

                // Create a new token with the username in the payload
                const token = jwt.sign({ username }, jwtKey, {
                    algorithm: "HS256"
                })

                res.cookie("token", token)

                res.send("Logged In.")
                res.end()
            });
        } catch (error) {
            console.log("Error : " + err);
        }
    });
    // #endregion

    return router;
}