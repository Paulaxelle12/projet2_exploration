// accessLogModel.js
const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
  method: String,
  // Autres champs
});

const AccessLog = mongoose.model("AccessLog", accessLogSchema);

module.exports = AccessLog;