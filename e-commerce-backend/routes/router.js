const express = require("express");
const {
  register,
  login,
  getUser,
  forgetPassword,
} = require("../controllers/authControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPasssword", forgetPassword);
router.get("/user", auth, getUser);

module.exports = router;
