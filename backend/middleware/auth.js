// Paramétrage du middleware d'authentification avec les Token
const jwt = require('jsonwebtoken');

const tokenKey = process.env.TOKEN_SPECIALKEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "'" + tokenKey + "'");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur non valide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Erreur de requête !')
    });
  }
};