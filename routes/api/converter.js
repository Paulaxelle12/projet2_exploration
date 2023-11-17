const express = require("express");
const router = express.Router();

//Vérification du type de requête
router.get("/", (req, res) => {
  res.status(405).send("Seules les requêtes POST sont acceptées!");
});

router.put("/", (req, res) => {
    res.status(405).send("Seules les requêtes POST sont acceptées!");
  });

  router.delete("/", (req, res) => {
    res.status(405).send("Seules les requêtes POST sont acceptées!");
  });

  router.patch("/", (req, res) => {
    res.status(405).send("Seules les requêtes POST sont acceptées!");
  });

//Requête de conversion
router.post("/", (req, res) => {

    const contentType = req.get('Content-Type');   

    if (contentType && contentType.includes('application/json')) 
    {
        // Extract type and value from the request body
        const { type, value } = req.body;

        // Check if the type is "feet2meter" and the value is a valid number
        if (type.toLowerCase() === "feettometer" && !isNaN(value)) {
            // log to server console for debugging
            console.log("Données reçues: " + req.body.type + " pour " + req.body.value);
            // Conversion
            const meters = feetToMeters(value);
            // Log the received data and the converted value
            console.log(`valeur reçue: ${value} feet. Convertie en ${meters} metres.`);
            // Send the converted value in the response
            res.status(200).send(`Valeur convertie: ${meters} metres.`);
        }
        else if(type.toLowerCase() === "metertofeet" && !isNaN(value)){
            // log to server console for debugging
            console.log("Données reçues: " + req.body.type + " pour " + req.body.value);
            //Conversion
            const feet = metersToFeet(value);
            // Log the received data and the converted value
            console.log(`valeur reçue: ${value} meters. Convertie en ${feet} pied.`);
            //Envoi de la réponse
            res.status(200).send(`Valeur convertie: ${feet} pieds.`);
        }
        else if(type.toLowerCase() === "kilotopound" && !isNaN(value))
        {
            // log to server console for debugging
            console.log("Données reçues: " + req.body.type + " pour " + req.body.value);
            //Conversion
            const pounds = kilogramsToPounds(value);
            // Log the received data and the converted value
            console.log(`valeur reçue: ${value} kilograms. Convertie en ${pounds} pieds.`);
            //Envoi
            res.status(200).send(`Valeur convertie: ${pounds} livre.`);
        }
        else if(type.toLowerCase() === "poundtokilo" && !isNaN(value))
        {
            // log to server console for debugging
            console.log("Données reçues: " + req.body.type + " pour " + req.body.value);
            //Conversion
            const kilo = poundsToKilograms(value);
            // Log the received data and the converted value
            console.log(`valeur reçue: ${value} pound. Convertie en ${kilo} kilogrammes.`);
            //Envoi
            res.status(200).send(`Valeur convertie: ${kilo} kilogrammes.`);
        }
        else if(type.toLowerCase() === "celsiustofahrenheit" && !isNaN(value))
        {
            // log to server console for debugging
            console.log("Données reçues: " + req.body.type + " pour " + req.body.value);
            //Conversion
            const fahrenheit = celsiusToFahrenheit(value);
            // Log the received data and the converted value
            console.log(`valeur reçue: ${value} celsius. Convertie en ${fahrenheit} fahrenheit.`);
            //Envoi
            res.status(200).send(`Valeur convertie: ${fahrenheit} fahrenheit.`);
        }
        else {
            // If the type is defined or the value is not a valid number, send an error response
            res.status(400).send("Entrée invalides!");
        }
    }
    else
    {
        res.status(400).send("Le contenu envoyé doit être en format JSON!");
    }
  });

module.exports = router;

// Fonction de conversion
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



