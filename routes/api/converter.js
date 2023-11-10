const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const config = require("./config");
const AccessLog = require("./accessLogModel");
const bodyParser = require("body-parser");


const app = express();
const PORT = process.env.PORT || 3000;

// Utilisation du middleware body-parser pour parser le corps de la requête
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

// Utilisation du routeur
app.use("/", router);

// Démarrage du serveur
//app.listen(PORT, () => {
//  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
//});

//Vérification du type de requête
router.get("/", (req, res) => {
    res.send("Only POST request are accepted!");
});

router.put("/", (req, res) => {
    res.send("Only POST request are accepted!");
});

router.delete("/", (req, res) => {
    res.send("Only POST request are accepted!");
});

router.patch("/", (req, res) => {
    res.send("Only POST request are accepted!");
});

//Requête de conversion
router.post("/", (req, res) => {
    // Extract type and value from the request body
    const { type, value } = req.body;
    
    // Check if the type is "feet2meter" and the value is a valid number
    if (type.toLowerCase() === "feettometer" && !isNaN(value)) {
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        // Conversion
        const meters = feetToMeters(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} feet. Converted to ${meters} meters.`);
        // Send the converted value in the response
        res.status(200).send(`Converted value: ${meters} meters.`);
    }
    else if(type.toLowerCase() === "metertofeet" && !isNaN(value)){
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        //Conversion
        const feet = metersToFeet(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} meters. Converted to ${feet} feet.`);
        //Envoi de la réponse
        res.status(200).send(`Converted value: ${feet} feet.`);
    }
    else if(type.toLowerCase() === "kilotopound" && !isNaN(value))
    {
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        //Conversion
        const pounds = kilogramsToPounds(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} kilograms. Converted to ${pounds} pounds.`);
        //Envoi
        res.status(200).send(`Converted value: ${pounds} pounds.`);
    }
    else if(type.toLowerCase() === "poundtokilo" && !isNaN(value))
    {
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        //Conversion
        const kilo = poundsToKilograms(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} pound. Converted to ${kilo} kilograms.`);
        //Envoi
        res.status(200).send(`Converted value: ${kilo} kilograms.`);
    }
    else if(type.toLowerCase() === "celsiustofahrenheit" && !isNaN(value))
    {
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        //Conversion
        const fahrenheit = celsiusToFahrenheit(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} celsius. Converted to ${fahrenheit} fahrenheit.`);
        //Envoi
        res.status(200).send(`Converted value: ${fahrenheit} fahrenheit.`);
    }
    else {
        // If the type is defined or the value is not a valid number, send an error response
        res.status(400).send("Invalid input.");
    }
  });

module.exports = router;

function metersToFeet(meters) {
    return meters * 3.28084;
}

function feetToMeters(feet) {
    return feet / 3.28084;
}

function kilogramsToPounds(kilograms) {
    return kilograms * 2.20462;
}

function poundsToKilograms(pounds) {
  return pounds / 2.20462;
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}



