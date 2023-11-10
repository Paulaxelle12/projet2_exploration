const express = require("express");
const router = express.Router();

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



