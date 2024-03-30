const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Main use of middleware is first check the user login or not if not login the throw error or log in first

module.exports = (req, res, next) => {
  try {
    // check

    const token = req.headers.authorization.split(" ")[1]; // store the token which present in header file (we have to enter)  ** but in token data bearer data come so we need to split and picked up data after bearer word

    const verify = jwt.verify(token, process.env.JWT_SECRET); // here first verify enterd token to secret key

    next(); // allow to next execution
  } catch (
    error // if not token found Throw error
  ) {
    return res.status(401).json({
      msg: "Invalid Token",
    });
  }
};
