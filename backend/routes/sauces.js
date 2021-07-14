// CREATION DU ROUTEUR pour les SAUCES
// Importation du Framework Express pour Node.js
const express = require('express');

// Création du routeur avec Express
const router = express.Router();

// Importation du Middleware d'authentification
const auth = require('../middleware/auth');

// Importation de Multer pour autoriser les fichiers entrants (images)
const multer = require('../middleware/multer-config');

// Importation de la logique métier pour la manipulation des sauces
const sauceCtrl = require('../controllers/sauces');

// Définition des routes avec les middlewares utilisés et la logique métier
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;