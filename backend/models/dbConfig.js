// Utilisation des variables d'environnement pour masquer les identifiants MongoDB
require('dotenv').config();
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
const sqlDb = process.env.SQL_DATABASE;

// Paramétrage de Mongoose pour l'accès à la base de données NoSQL
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://" + sqlUser + ":" + sqlPassword 
  + "@ocrtest.hasrg.mongodb.net/" + sqlDb + "?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));