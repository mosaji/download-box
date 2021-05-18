const config = require("../app/config");
const socket = require("socket.io-client")(config.api.host);

module.exports = socket;
