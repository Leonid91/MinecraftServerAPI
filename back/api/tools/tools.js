const Rcon = require('rcon');

function sendCommandRcon(command, res) {
    const rcon = getRcon()

    rcon.on('auth', function () {
        // You must wait until this event is fired before sending any commands,
        // otherwise those commands will fail.
        console.log("Authenticated.")
        console.log("Display of the received command: ", JSON.stringify(command))
        rcon.send(command)
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

    rcon.connect()
}

function getRcon() {
    const options = {
        tcp: true,       // false for UDP, true for TCP (default true)
        challenge: true  // true to use the challenge protocol (default true)
    };

    console.log("Starting rcon connection...")
    const rcon = new Rcon('localhost', 25575, 'rcon', options); //mc_serv

    return rcon
}

function getPlayersFromWhitelistResponse(str, separator) {
    const trimmedStr = trimGetWhitelistResponse(str)
    return trimmedStr.split(separator)
}

function trimGetWhitelistResponse(str) {
    if (str != "" && str != null && str != " ") {
        if (str === "There are no whitelisted players") {
            return ""
        }
        strWithoutWhitespaces = str.replaceAll(" ", "")
        return strWithoutWhitespaces.split(":").pop()
    }
}

module.exports = { sendCommandRcon, getRcon, getPlayersFromWhitelistResponse }