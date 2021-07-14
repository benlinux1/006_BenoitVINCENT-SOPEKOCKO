// Utilisation de bcrypt pour hashage du mot de passe
const bcrypt = require('bcrypt');

// Utilisation de JSON Web Token pour les jetons d'authentification User
const jwt = require('jsonwebtoken');

// Importation du modèle d'utilisateur
const User = require('../models/user');

// Utilisation de CryptoJS pour chiffrement de l'email dans MongoDB (RGPD)
const CryptoJS = require('crypto-js');

// Utilisation des variables d'environnement pour les clés secrètes de CryptoJS
const cryptedKey = process.env.CRYPTOJS_SECRETKEY;
const cryptedIv = process.env.CRYPTOJS_SECRETIV;
const key = CryptoJS.enc.Hex.parse("'" + cryptedKey + "'");
const iv = CryptoJS.enc.Hex.parse("'" + cryptedIv + "'");

// Utilisation d'une variable d'environnement pour la clé secrète de JWT
const tokenKey = process.env.TOKEN_SPECIALKEY;

// Logique métier pour l'inscription de l'utilisateur avec chiffrement AES de l'email et hash du password
exports.signup = (req, res, next) => {
  let cryptedEmail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: cryptedEmail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Logique métier pour la connexion d'un utilisateur déjà inscrit, grâce à CryptoJS, findOne et bcrypt.compare
exports.login = (req, res, next) => {
  let cryptedEmail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
  User.findOne({ email: cryptedEmail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            // Utilisation d'un jeton d'authentification pour sécuriser la connexion
            token: jwt.sign(
              { userId: user._id },
              "'" + tokenKey + "'",
              // Ajout d'une expiration pour sécuriser la session
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
