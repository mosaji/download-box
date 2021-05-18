const disk = require("diskusage");
const os = require("os");
const drivelist = require("drivelist");
const conf = require("config");
const fs = require("fs");

// Callbacks
var info = function(callback) {
  drivelist.list((error, drives) => {
    if (error) {
      throw error;
    }

    var result;
    var allAdrives = new Array();
    drives.forEach(function(element) {
      element.mountpoints.forEach(function(mountpoint) {
        disk.check(mountpoint.path, function(err, info) {
          var obj = { dir: mountpoint, inf: info };
          allAdrives.push(obj);
        });
      });
    });
    console.log("conf", conf);

    result = {
      os: os.platform(),
      drives: allAdrives,
      default: conf.get("defaultDownloadDir"),
      current: conf.get("downloadDir")
    };

    callback(result);

    return result;
  });
};

var setDlPath = function(path) {
  if (fs.existsSync(path)) {
    var file = "./config/default.json";
    let rawdata = fs.readFileSync(file);
    let confeeg = JSON.parse(rawdata);
    confeeg.downloadDir = path;
    fs.writeFileSync(file, JSON.stringify(confeeg));
  } else {
    throw "hell";
  }
};

module.exports = {
  info,
  setDlPath
};
