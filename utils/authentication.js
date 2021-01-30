const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY || "test";

// used to check authentication as middleware
function checkAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("No Available token");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token");
  }
}

function createToken(userId) {
  const token = jwt.sign({ _id: userId }, secretKey, { expiresIn: "288884h" });
  return token;
}

module.exports = {
  checkAuth,
  createToken,
};
