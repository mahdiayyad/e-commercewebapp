const express = require("express");
const {
  register,
  login,
  forgetPassword,
  verifyResetPasswordToken,
  resetPassword,
} = require("../controllers/authControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPasssword", forgetPassword);
router.post("/reset-password", resetPassword);

router.get("/verify-reset-token/:token", verifyResetPasswordToken);
module.exports = router;
