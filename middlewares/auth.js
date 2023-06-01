// auth  , isStudent , isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //token can be extracted by body , cookie and headers
    const token = req.body.token;
    //other ways pending

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });


try {
    
} catch (error) {
    
}

    }

    // verify the token
  } catch (error) {}
};
