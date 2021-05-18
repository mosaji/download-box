const config = require("../app/config");
const Aria2 = require("aria2");
const aria2 = new Aria2(config.aria2);

module.exports = aria2;
