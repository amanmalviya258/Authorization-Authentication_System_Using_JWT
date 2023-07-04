const bcrypt = require("bcrypt");
const User = require("../models/userData");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
  try {
    //getting data
    const { name, email, password, role } = req.body;
    console.log(password);
    //check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
      console.log(error);
    }
    //create entry for User
    const user = await User.create({
      name,
      email,
      password,
      role,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      message: "User Created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error",
    });
  }
};


// login route handler
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({
        success: "false",
        message: "fill the details correctly",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered",
      });
    }
    // generate payload
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

     //  user = user.toObject();
     password = undefined;
    //   console.log(user.password);
     user.token = user;
      const options = {
        expires: new Date(Date.now() +30*1000),
        httpOnly: true,
      };
      
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "user logged in successfully",
        token, user,
       password
      });
    } else {
      //passwsord do not match
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed in login",
    });
  }
};
