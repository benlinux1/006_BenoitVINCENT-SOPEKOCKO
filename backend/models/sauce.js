// Construction du modèle de sauce avec Mongoose et mongoose.schema
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default:0 },
  dislikes: { type: Number, default:0 },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
});

module.exports = mongoose.model('Sauce', sauceSchema);