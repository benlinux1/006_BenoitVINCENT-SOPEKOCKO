// Importation du modèle de sauce
const Sauce = require('../models/sauce');

// Modification possible du système de fichiers grâce à FS (File System)
// FS utilisé pour la fonction de suppression d'image
const fs = require('fs');

// Logique métier pour création d'une sauce avec save
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Logique métier pour modification des likes et dislikes
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  // Création d'un switch pour les différents cas de figure
  switch (like) { 
    // CAS 1 : si l'utilisateur aime
    case 1:
      Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked:userId }, $inc: { likes:1 } })
      .then(() => res.status(200).json({ message: 'Merci pour votre LIKE !'}))
      .catch(error => res.status(400).json({ error }));
      break;
    // CAS -1 : si l'utilisateur n'aime pas
    case -1:
      Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked:userId }, $inc: { dislikes:1 } })
      .then(() => res.status(200).json({ message: 'Nous sommes navrés que cette sauce ne vous plaise pas !'}))
      .catch(error => res.status(400).json({ error }));
      break;
    // CAS 0 : Si l'utilisateur n'aime plus ou ne déteste plus (possible grâce à includes)
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          // S'il n'aime plus
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked:userId }, $inc: { likes:-1 } })
              .then(() => res.status(200).json({ message: 'Nous sommes navrés que cette sauce ne vous plaise pas !'}))
              .catch(error => res.status(400).json({ error }));
          }
          // Sinon, c'est qu'il ne déteste plus
          else {
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked:userId }, $inc: { dislikes:-1 } })
              .then(() => res.status(200).json({ message: 'Nous sommes ravis que cette sauce ne vous déplaise pas !'}))
              .catch(error => res.status(400).json({ error }));
          }
        })
      break;
  }
}

// Logique métier pour modification d'une sauce avec "updateOne"
exports.modifySauce = (req, res, next) => {
  // si une nouvelle image est ajoutée, il y aura un req.file
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      // alors modification de l'imageUrl
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      // sinon on ne prend que le corps de la requête
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Logique métier pour suppression d'une sauce avec "deleteOne"
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      // Suppression de l'image dans le dossier image
      fs.unlink(`images/${filename}`, () => {
        // Callback pour suppresion de la sauce de la Database
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Logique métier pour affichage d'une sauce avec "findOne"
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

// Logique métier pour affichage de toutes les sauces avec "find"
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};