const express = require("express");
const { register, login, getUser } = require("../controllers/authControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", auth, getUser);

module.exports = router;
