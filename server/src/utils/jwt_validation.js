const jwt = require("jsonwebtoken");

// Method to verify the token

const verifyToken = (req, res, next) => {
  // First check request headers has authorization or not
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).send({ error: "Token not found" });

  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).send({ error: "Unauthorized" });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userPaylod = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Invalid token" });
  }
};

// Method to generate JWT token

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { verifyToken, generateToken };
