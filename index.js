const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./routes/api/config");
const AccessLog = require("./routes/api/accessLogModel");
const bodyParser = require("body-parser");

app.use(express.json());
app.use("/api/converter", require("./routes/api/converter"));

app.get("/", (req, res) => {
    res.send("API de conversion de Sarah: Connexion avec DockerFile");
});

//Pour MongoDB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connexion à l'MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connecté à MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB Atlas : ${err}");
});

// Middleware pour enregistrer les journaux d'accès dans MongoDB
app.use(async (req, res, next) => {
  // Création d'un nouvel objet AccessLog avec les informations de la requête
  const accessLog = new AccessLog({
    ip: req.ip,         // IP source de la requête
    method: req.method, // Méthode de la requête (GET, POST, etc.)
    Date_heure: Date.now(),
  });

  try {
    // Enregistrement du journal d'accès dans la base de données
    await accessLog.save();
    next(); // Passer au middleware suivant
  } catch (err) {
    // Gestion des erreurs lors de l'enregistrement dans la base de données
    console.error("Erreur lors de l'enregistrement du journal d'accès : ${err}");
    res.status(500).send("Erreur serveur interne");
  }
});

app.listen(8080, () => console.log('Server started'));