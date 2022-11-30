const jwt = require("jsonwebtoken");

let key = process.env.JWT_KEY;

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

module.exports = { generateToken };
