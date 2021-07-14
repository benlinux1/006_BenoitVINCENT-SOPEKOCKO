// CONSTRUCTION DE L'APPLICATION avec le Framework Express 
const express = require('express');
const app = express();

// Importation de la dépendance Express Mongo Sanitize contre l'injection
const mongoSanitize = require('express-mongo-sanitize');

// Importation de la dépendance Helmet pour sécuriser le code
const helmet = require('helmet');

// Importation de HPP (HTTP Parameter Pollution)
const hpp = require('hpp');

// Utilisation de express-session pour sécuriser les sessions utilisateurs côté serveur
let session = require('express-session');
const sessionKey = process.env.SECRET_SESSION_KEY;

// Variable qui permettra l'extraction au format JSON de la requête reçue du Front-End 
const bodyParser = require('body-parser');

// Importation des routes pour Sauces et User
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Utilisation du path serveur pour gestion des images
const path = require('path');

// Importation de dbConfig pour l'accès à la base de données NoSQL
require('./models/dbConfig');

// Utilisation et paramétrage du framework Express pour les requêtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation d'Express-session pour sécuriser les sessions de l'API
var sess = {
  secret: "'" + sessionKey + "'",
  cookie: {},
  resave: false,
  saveUninitialized: true,
}
// S'il s'agit d'un environnement de production
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // Faire confiance au proxy n°1
  sess.cookie.secure = true // sécuriser le cookie de session
}
app.use(session(sess));

// Utilisation de MongoSanitize pour sécuriser l'API
app.use(mongoSanitize());

// Utilisation de HPP pour sécuriser les requêtes de l'API
app.use(hpp());

// Utilisation de Helmet pour sécuriser l'API
app.use(helmet());

// Extraction au format JSON de la requête reçue du Front-End
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gestion statique du dossier "Images" par Express à chaque requête
app.use('/images', express.static(path.join(__dirname, 'images')));

// Définition des routes pour les sauces et les utilisateurs
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;