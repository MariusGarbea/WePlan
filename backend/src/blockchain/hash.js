const SHA256 = require("crypto-js/sha256");

const hash = (index, eventID, timestamp, data) => {
  return SHA256(index + eventID + timestamp + data).toString();
};

module.exports = {hash};
