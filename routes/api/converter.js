const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Need a POST request plz!");
});

router.post("/", async (req, res) => {
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
        res.send(`Converted value: ${meters} meters.`);
    }
    else if(type.toLowerCase() === "meters2feet" && !isNaN(value)){
        // log to server console for debugging
        console.log("received data: " + req.body.type + " for " + req.body.value);
        //Conversion
        const feet = metersToFeet(value);
        // Log the received data and the converted value
        console.log(`Received data: ${value} meters. Converted to ${feet} feet.`);
        //Envoi
        res.send(`Converted value: ${feet} feet.`);
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
        res.send(`Converted value: ${pounds} pounds.`);
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

// Conversion de Poids
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

// Conversion de Devise
function bitcoinToCAD(bitcoin) {
  // Remplacez cette valeur par le taux de change actuel
  const exchangeRateBTCtoCAD = 50000; // Exemple seulement
  return bitcoin * exchangeRateBTCtoCAD;
}

function CADToBitcoin(cad) {
  // Remplacez cette valeur par le taux de change actuel
  const exchangeRateCADtoBTC = 0.00002; // Exemple seulement
  return cad * exchangeRateCADtoBTC;
}

// Conversion de Volume
function litersToGallons(liters) {
  return liters * 0.264172;
}

function gallonsToLiters(gallons) {
  return gallons / 0.264172;
}

// Exemples d'utilisation
console.log("5 mètres équivalent à " + metersToFeet(5) + " pieds.");
console.log("10 pieds équivalents à " + feetToMeters(10) + " mètres.");

console.log("2 kilogrammes équivalents à " + kilogramsToPounds(2) + " livres.");
console.log("5 livres équivalent à " + poundsToKilograms(5) + " kilogrammes.");

console.log("20 degrés Celsius équivalent à " + celsiusToFahrenheit(20) + " degrés Fahrenheit.");
console.log("68 degrés Fahrenheit équivalents à " + fahrenheitToCelsius(68) + " degrés Celsius.");

console.log("1 Bitcoin équivaut à " + bitcoinToCAD(1) + " dollars canadiens.");
console.log("1000 dollars canadiens équivalent à " + CADToBitcoin(1000) + " Bitcoins.");

console.log("10 litres équivalent à " + litersToGallons(10) + " gallons.");
console.log("5 gallons équivalents à " + gallonsToLiters(5) + " litres.");
