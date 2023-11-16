const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./routes/api/config");
const AccessLog = require("./routes/api/accessLogModel");
const bodyParser = require("body-parser");

// Pour DockerFile
app.get("/", (req, res) => {
    res.send("API de conversion : Connexion avec DockerFile");
});

//Pour MongoDB
app.use(async (req, res, next) => {
  const accessLog = new AccessLog({
    ip: req.ip,
    method: req.method,
    timestamp: new Date(),
  });

  try {
    await accessLog.save();
    next();
  } catch (err) {
    console.error(`Erreur lors de l'enregistrement du journal d'accès : ${err}`);
    res.status(500).send("Erreur serveur interne");
  }
});

app.use(express.json());
app.use("/api/converter", require("./routes/api/converter"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connecté à MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error(`Erreur de connexion à MongoDB Atlas : ${err}`);
});

app.listen(808080, () => console.log('Server started'));