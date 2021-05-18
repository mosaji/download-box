const config = require("../app/config");

const bytesToSize = bytes => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const jobRegister = func => {
  let define;
  setInterval(() => {
    func(define, i => (define = i));
  }, config.jobDelay);
};

const execute = (command, callback = () => {}) => {
  const exec = require("child_process").exec;

  exec(command, (err, stdout, stderr) => {
    // process.stdout.write(stdout);
    callback(stdout);
  });
};

module.exports = {
  jobRegister,
  bytesToSize,
  execute
};
