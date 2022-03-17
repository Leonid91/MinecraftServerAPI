const rcon = require('rcon');

function sendCommandRcon(command, res) {
    const conn = connectRcon()

    conn.on('auth', function () {
        // You must wait until this event is fired before sending any commands,
        // otherwise those commands will fail.
        console.log("Authenticated.")
        console.log("Display of the received command: ", JSON.stringify(command))
        conn.send(command)
    }).on('response', function (str) {
        console.log("Response: " + str)
        res.send(str)
    }).on('error', function (err) {
        console.log("Error: " + err)
    }).on('end', function () {
        console.log("Connection closed.")
        res.end()
        process.exit()
    });
}

function connectRcon() {
    const options = {
        tcp: true,       // false for UDP, true for TCP (default true)
        challenge: true  // true to use the challenge protocol (default true)
    };

    const conn = new rcon('mc_serv', 25575, 'rcon', options);

    return conn
}
module.exports = { sendCommandRcon }