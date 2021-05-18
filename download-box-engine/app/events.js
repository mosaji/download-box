const _ = require("lodash");
const path = require("path");
const drivelist = require("drivelist");
const disk = require("diskusage");
const socket = require("../modules/socket");
const aria2 = require("../modules/aria2");
const execute = require("../modules/common").execute;

// Default Channel
const CONNECT = "connect";
const DISCONNECT = "disconnect";
// My Channel
const NOTIFY = "NOTIFY";
const SERVICE = "SERVICE";
// My Sub Channel
const GLOBAL_STAT = "GLOBAL_STAT";
const ACTIVE = "ACTIVE";
const STOPPED = "STOPPED";
const WAIT = "WAIT";
const STORAGE_INFO = "STORAGE_INFO";
const STATUS = "STATUS";

const createConnection = callback => {
  console.log("on_connect");
  socket.on(CONNECT, function() {
    // FUCKING NOTE
    socket.emit("ROOM", "6666");
    console.log("CONNECTED_TO_ROOM");
    callback();
  });
};

const getGlobalStat = (isChange = undefined, callback = () => {}) => {
  aria2
    .call("getGlobalStat")
    .then(i => {
      const r = JSON.stringify(i);
      if (!_.isEqual(isChange, r)) {
        socket.emit(SERVICE, { channel: GLOBAL_STAT, data: r });
        callback(r);
      }
    })
    .catch(e => {
      sendError("there was a problem connecting to Aria2");
      throw e;
    });
};

const tellActive = (isChange = undefined, callback = () => {}) => {
  aria2.call("tellActive").then(i => {
    const r = JSON.stringify(i);
    if (!_.isEqual(isChange, r)) {
      socket.emit(SERVICE, { channel: ACTIVE, data: r });
      callback(r);
    }
  });
};

const tellWaiting = (isChange = undefined, callback = () => {}) => {
  aria2.call("tellWaiting", 0, 30).then(i => {
    const r = JSON.stringify(i);
    if (!_.isEqual(isChange, r)) {
      socket.emit(SERVICE, { channel: WAIT, data: r });
      callback(r);
    }
  });
};

const tellStopped = (isChange = undefined, callback = () => {}) => {
  aria2.call("tellStopped", 0, 30).then(i => {
    const r = JSON.stringify(i);
    if (!_.isEqual(isChange, r)) {
      socket.emit(SERVICE, { channel: STOPPED, data: r });
      callback(r);
    }
  });
};

const sendError = message => {
  socket.emit("SERVICE", {
    channel: "ERROR",
    data: message
  });
};

const addDownload = magent => {
  if (!magent.dir) magent.dir = path.resolve(".", "static");

  aria2
    .call("addUri", [magent.url], { dir: "./static" })
    .then(i => {
      console.log("ADDED_TO_LIST");

      // if (magnet.offset !== null) {
      //   console.log(magnet.offset);
      //   //first pause 1;
      //   onPause(i);
      //   setTimeout(function() {
      //     onResume(i);
      //   }, magnet.offset);
      // }
    })
    .catch(e => {
      e.text = "No URI to download.";
      sendError(e);
    });
};

const removeDownload = ({ gid, name }) => {
  aria2
    .call("purgeDownloadResult", gid)
    .then(() => {
      console.log(gid, name);
      execute(`rm -rf ${path.resolve("static")}/${name}`);
    })
    .catch(e => {
      console.log(e);
      e.text = "Active Download not found.";
      sendError(e);
    });
};

const fourceRemoveDownload = payload => {
  aria2.call("forceRemove", payload);
};

const pauseDownload = payload => {
  aria2.call("pause", payload);
};

const pauseAllDownload = () => {
  aria2.call("pauseAll");
};

const resumeDownload = payload => {
  aria2.call("unpause", payload);
};

const tellStatus = () => {
  const status = {};
  execute("hostname -I", out => {
    status.ip = out.replace(/\n/g, "");
    status.ip = status.ip.replace(/ /g, "");
    console.log(status);
    if (!status.ip) {
      status.ip = "192.168.1.3";
    }
    socket.emit(SERVICE, { channel: STATUS, data: status });
  });
};

const tellStorageInfo = () => {
  drivelist.list().then(drives => {
    const usbs = drives.filter(i => i.mountpoints.length);
    // const usbs = drives;
    const list = [];
    usbs.map((i, index) => {
      disk.check(i.mountpoints[0].path).then(info => {
        list[index] = {
          mountpoints: i.mountpoints,
          description: i.description,
          size: info.total,
          free: info.available,
          isUSB: i.isUSB
        };
        if (usbs.length === list.length) {
          socket.emit(SERVICE, { channel: STORAGE_INFO, data: list });
        }
      });
    });
  });
};

const transfeFile = (name, address) => {
  console.log(name, address);
  execute(`cp ${path.resolve("static")}/${name} ${address}`, () => {
    setTimeout(() => {
      socket.emit(SERVICE, { channel: "END_TRANSFER_FILE", data: "" });
    }, 1000);
  });
};

module.exports = {
  createConnection,
  getGlobalStat,
  tellActive,
  tellStopped,
  tellWaiting,
  addDownload,
  removeDownload,
  pauseDownload,
  pauseAllDownload,
  resumeDownload,
  tellStatus,
  sendError,
  tellStorageInfo,
  transfeFile
};
