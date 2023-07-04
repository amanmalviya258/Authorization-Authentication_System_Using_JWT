// auth  , isStudent , isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");

exports.auth = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");

  console.log("header", req.header("Authorization"));
  console.log("cookie", req.cookies.token);
  console.log("body", req.body.token);

  try {
    //token can be extracted by body,cookie and headers

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    //verify the token

    try {
      //jwt.verify token decode krta h secret key k through jisso verify ho jaata h ki token true h
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      //request m payload daal diya user ka
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching the student role",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "THis is a protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not the admin role matching",
    });
  }
};
