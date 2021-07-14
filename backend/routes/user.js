// CREATION DU ROUTEUR POUR LES UTILISATEURS
// Importation du Framework Express pour Node.js
const express = require('express');

// Création du routeur avec Express
const router = express.Router();

// Importation de la logique métier pour l'identification des utilisateurs
const userCtrl = require('../controllers/user');

// Définition des routes pour les Utilisateurs avec la logique métier
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;