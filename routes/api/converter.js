const express = require("express");
const router = express.Router();
const https = require('https');
const fs = require('fs');

const app = express();

// Redirection HTTP vers HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});

const httpsOptions = {
  key: fs.readFileSync('chemin/vers/votre/certificat-key.pem'),
  cert: fs.readFileSync('chemin/vers/votre/certificat-cert.pem')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(80);
httpsServer.listen(443);

router.get("/", (req, res) => {
    res.send("Need a POST request plz!");
});

router.post("/", (req, res) => {
    // Extract type and value from the request body
    const { type, value } = req.body;
    // Check if the type is "feet2meter" and the value is a valid number
    if (type.toLowerCase() === "feet2meter" && !isNaN(value)) {
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        // Convert value from feet to meters (1 foot = 0.3048 meters)
        const meters = parseFloat(value) * 0.3048;
        // Log the received data and the converted value
        console.log(`Received data: ${value} feet. Converted to ${meters} meters.`);
        // Send the converted value in the response
        res.status(200).send(`Converted value: ${meters} meters.`);
    }
    else if(type.toLowerCase() === "meters2feet" && !isNaN(value)){
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        //Conversion
        const feet = metersToFeet(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} meters. Converted to ${feet} feet.`);
        //Envoi
        res.status(200).send(`Converted value: ${feet} feet.`);
    }
    else if(type.toLowerCase() === "kilotopounds" && !isNaN(value))
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
    else if(type.toLowerCase() === "poundstokilo" && !isNaN(value))
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

// Conversion de Longueur
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

// Conversion de Température
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}


