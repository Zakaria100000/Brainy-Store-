// Import the jsonwebtoken module and retrieve the secret key from the environment variables
const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

// Middleware function to authenticate a client using the JSON Web Token (JWT)
function authenticateClient(req, res, next) {
  const token = req.headers.authorization;

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "Missing authentication token" });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(TOKEN_SECRET_KEY, secretKey);

    // Check if the decoded token has the role of a client
    if (decodedToken.role === "client") {
      // Check if the decoded token has the role of a client
      req.client = decodedToken;
      return next();
    }

    // If the decoded token does not have the role of a client, return an error response
    return res.status(401).json({ message: "Invalid authentication token" });
  } catch (err) {
    // If an error occurs while decoding the token, return an error response
    return res.status(401).json({ message: "Invalid authentication token" });
  }
}

// Middleware function to authenticate an ad using the JSON Web Token (JWT)
function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token" });
  }

  try {
    const decodedToken = jwt.verify(TOKEN_SECRET_KEY, secretKey);

    if (decodedToken.role === "admin") {
      req.admin = decodedToken;
      return next();
    }

    return res.status(401).json({ message: "Invalid authentication token" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid authentication token" });
  }
}

module.exports = {
  authenticateClient,
  authenticateAdmin,
};
