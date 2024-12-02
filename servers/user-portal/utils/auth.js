const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    return jwt.verify(token, "your_secret_key");
  } catch (error) {
    return null;
  }
};

module.exports = { verifyToken };
