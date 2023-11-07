const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

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

// Conversion de Devise (Exemple)
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

// Validation des entrées avec express-validator
const validateConversion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes pour les conversions de longueur
app.get('/convert/meters-to-feet', [
  check('meters').isFloat()
], validateConversion, (req, res) => {
  const meters = parseFloat(req.query.meters);
  const result = metersToFeet(meters);
  res.json({ result });
});

app.get('/convert/feet-to-meters', [
  check('feet').isFloat()
], validateConversion, (req, res) => {
  const feet = parseFloat(req.query.feet);
  const result = feetToMeters(feet);
  res.json({ result });
});

// Routes pour les conversions de poids (similaires aux conversions de longueur)

// Routes pour les conversions de température (similaires aux conversions de longueur)

// Routes pour les conversions de devise
app.get('/convert/bitcoin-to-cad', [
  check('bitcoin').isFloat()
], validateConversion, (req, res) => {
  const bitcoin = parseFloat(req.query.bitcoin);
  const result = bitcoinToCAD(bitcoin);
  res.json({ result });
});

app.get('/convert/cad-to-bitcoin', [
  check('cad').isFloat()
], validateConversion, (req, res) => {
  const cad = parseFloat(req.query.cad);
  const result = CADToBitcoin(cad);
  res.json({ result });
});

// Routes pour les conversions de volume (similaires aux conversions de longueur)

// Gestion des erreurs pour les routes non définies
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
