const express = require("express");
// const usbDetect = require("usb-detection");
const socket = require("./modules/socket");
const events = require("./app/events");
const jobRegister = require("./modules/common").jobRegister;

const {
  getGlobalStat,
  tellWaiting,
  tellStopped,
  tellActive,
  createConnection,
  tellStatus,
  tellStorageInfo,
  sendError
} = events;

// usbDetect.startMonitoring();

// Detect add/insert
// usbDetect.on("add", info => {
//   setTimeout(() => {
//     tellStorageInfo();
//     sendError(`USB ${info.manufacturer} ${info.deviceName} Detected`);
//   }, 4000);
// });

// Detect remove
// usbDetect.on("remove", info => {
//   tellStorageInfo();
//   sendError(`USB ${info.manufacturer} ${info.deviceName} Removed`);
// });

const app = express();

app.listen(process.env.PORT || 8000, function() {
  console.log("Listening Download Server -------");
});

socket.on("SERVICE", payload => {
  const data = payload.data;
  const channel = payload.channel;

  switch (channel) {
    case "ADD_DOWNLOAD":
      events.addDownload(data);
      break;
    case "RESUME_DOWNLOAD":
      events.resumeDownload(data.gid);
      break;
    case "PAUSE_DOWNLOAD":
      events.pauseDownload(data.gid);
      break;
    case "REMOVE_DOWNLOAD":
      events.removeDownload(data);
      break;
    case "TRANSFER_FILE":
      events.transfeFile(data.name, data.path);
      break;

    default:
      break;
  }
});

socket.on("ROOM", () => {
  getGlobalStat();
  tellWaiting();
  tellStopped();
  tellActive();
  tellStatus();
  tellStorageInfo();
});

app.get("/download", function(req, res) {
  if (req.query.name) {
    var file = __dirname + "/static/" + req.query.name;

    res.download(file); // Set disposition and send it.
  }
});

createConnection(() => {
  jobRegister(getGlobalStat);
  jobRegister(tellActive);
  jobRegister(tellStopped);
  jobRegister(tellWaiting);
});
