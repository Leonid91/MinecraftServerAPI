const rcon = require('rcon');

function sendCommandRcon(command, res) {
    const conn = connectRcon()
    console.table(conn)

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

    console.log("Starting rcon connection...")
    const conn = new rcon('localhost', 25575, 'rcon', options); //mc_serv

    return conn
}
module.exports = { sendCommandRcon }