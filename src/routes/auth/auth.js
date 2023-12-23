const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("Invalid token");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodedToken);
    const { id, type } = decodedToken;

    console.log(decodedToken);

    if (!id || !type) {
      console.log("ACCEES REFUSE");
      throw "Invalid user ID";
    }

    console.log("ACCEES ACCORDE");
    req.auth = { id, type };
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("Invalid token");
  }
};
