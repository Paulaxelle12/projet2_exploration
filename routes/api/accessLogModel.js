// accessLogModel.js
const mongoose = require("mongoose");

// Définition du schéma pour le modèle accessLogSchema
const accessLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  method: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Création du modèle à partir du schéma
const AccessLog = mongoose.model("AccessLog", accessLogSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = AccessLog;