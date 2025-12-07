const jwt = require('jsonwebtoken');
const authMiddleWare = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Unauthrized' });
    }
    const decodedToken = jwt.verify(token, 'ITM');

    if (!decodedToken) {
      res.status(401).json({ message: 'Tocken is invalid' });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = authMiddleWare;
