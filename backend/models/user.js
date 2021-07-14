// Construction du modèle d'uilisateur UNIQUE avec Mongoose-unique-validator et mongoose.Schema
const mongoose = require('mongoose');

// Utilisation du plugin unique-validator pour ne pas créer 2 users identiques
const uniqueValidator = require('mongoose-unique-validator');

// Utilisation d'un schéma Mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);