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
    return router;
};

