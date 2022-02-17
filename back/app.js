const controllers = require("./api");
const rcon = require('rcon');
const express = require('express');
const router = express.Router();

async function startServer() {
  const app = express();
  const port = 3000;

  // await require("./loaders")(app);

  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    console.log(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️ 
        ################################################
      `);
  });
}

startServer();

/** RCON */
let conn = new rcon('82.64.160.64', 25575, 'test');

conn.on('auth', function() {
  // You must wait until this event is fired before sending any commands,
  // otherwise those commands will fail.
  console.log("Authenticated");
  console.log("Sending command: help")
  conn.send("help");
}).on('response', function(str) {
  console.log("Response: " + str);
}).on('error', function(err) {
  console.log("Error: " + err);
}).on('end', function() {
  console.log("Connection closed");
  process.exit();
});

conn.connect();