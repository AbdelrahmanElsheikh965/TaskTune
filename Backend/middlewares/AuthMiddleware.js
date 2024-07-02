const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "123");
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }

}

module.exports = verifyToken

/**
 * You cannot pass more than 1 function in an object
 * module.exports = { verifyToken_1, verifyToken_2  }
 * This will result in => Error: Route.get() requires a callback function but got a [object Object]
 * 
 * Instead, if you wanna export more than 1 functionality you can make as many
 * constants as you want and export them altogether in an object.
 */