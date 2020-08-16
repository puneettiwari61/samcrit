const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: async user => {
    var payload = { userId: user.id, name: user.name };
    var token = await jwt.sign(
      payload,
      process.env.SECRET
      // {expiresIn: "30s"}
    );
    return token;
  },
  verifyToken: async (req, res, next) => {
    var token = req.headers["authorization"] || "";
    if (token) {
      try {
        var payload = jwt.verify(token, process.env.SECRET);
        req.user = payload;
        req.user.token = token;
        next();
      } catch (error) {
        res.json({ message: "invalid token", error });
      }
    } else {
      res.json({ msg: "Token required " });
    }
  }
};
