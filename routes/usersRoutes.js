const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/Auth");
const { auth, isStudent , isAdmin } = require("../middlewares/auth");

//normal routes
router.post("/login", login);
router.post("/signup", signup);

//protected routes

router.get("/Test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for test",
  });
});

router.get("/Student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for student",
  });
// res.send(`<h1>This is a student route </h1>`)
});

router.get("/Admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for admin",
  });
 // res.send(`<h1>This is an admin route </h1>`)
});

module.exports = router;
