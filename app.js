const rcon = require('rcon');
const http = require('http');
const express = require('express');
const router = express.Router();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

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