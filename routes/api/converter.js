const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Need a POST request plz!");
});

router.post("/", (req, res) => {
    // Extract type and value from the request body
    const { type, value } = req.body;

    // Validation des données d'entrée
    if (!type || !value || isNaN(value)) {
        return res.status(400).json({ error: "Invalid input. Provide type and numeric value." });
    }

    // Conversion en minuscules pour gérer la casse
    const conversionType = type.toLowerCase();

    let result;
    switch (conversionType) {
        case "feet2meter":
            result = feetToMeters(value);
            break;
        case "meters2feet":
            result = metersToFeet(value);
            break;
        case "kilotopounds":
            result = kilogramsToPounds(value);
            break;
        default:
            return res.status(400).json({ error: "Invalid conversion type." });
    }

    // Log de la conversion
    console.log(`Received data: ${value} for ${type}. Converted to ${result}`);

    // Envoi du résultat
    res.json({ result });
});

// Fonctions de conversion (à conserver telles quelles)
function metersToFeet(meters) {
    return meters * 3.28084;
}

function feetToMeters(feet) {
    return feet / 3.28084;
}

function kilogramsToPounds(kilograms) {
    return kilograms * 2.20462;
}

module.exports = router;
