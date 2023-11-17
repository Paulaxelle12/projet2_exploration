const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./routes/api/config");
const AccessLog = require("./routes/api/accessLogModel");
const bodyParser = require("body-parser");

// Middleware pour gérer les journaux d'accès
app.use(async (req, res, next) => {
  // Création d'un nouvel objet AccessLog avec les informations de la requête
  const accessLog = new AccessLog({
    ip: req.ip,         // IP source de la requête
    method: req.method, // Méthode de la requête (GET, POST, etc.)
    timestamp: new Date(), // Date et heure de la requête
  });

  // Tentative d'enregistrement du journal d'accès dans la base de données
  try {
    await accessLog.save();
    // Poursuivre avec le middleware suivant
    next();
  } catch (err) {
    // Gestion des erreurs lors de l'enregistrement dans la base de données
    console.error("Erreur lors de l'enregistrement du journal d'accès : ",err);
    res.status(500).send("Erreur serveur interne");
  }
});

// Pour DockerFile
app.get("/", (req, res) => {
    res.send("API de conversion : Connexion avec DockerFile");
});

// Configuration pour le parsing du corps des requêtes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Gestion des événements de connexion à MongoDB
mongoose.connection.on("connected", () => {
  console.log("Connecté à MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB Atlas : ${err}");
});

// Configuration des routes pour les conversions
app.use("/api/converter", require("./routes/api/converter"));

// Lancement du serveur sur le port 8080
app.listen(8080, () => console.log('Server started'));
