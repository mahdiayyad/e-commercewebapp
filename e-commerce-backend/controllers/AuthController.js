const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const resetPasswordTokensSchema = require("../schemas/resetPasswordTokensSchema");
var nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordExists,
  insertRecord,
  updateRecord,
} = require("../utils/sqlFunctions");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, `${process.env.JWT_SECRET}`, { expiresIn: "7d" });
};

const generatePasswordResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    phoneCode,
    email,
    password,
    confirmPassword,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !phoneCode ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    res.status(200).json({ message: "Please fill all fields." });
    return;
  }

  if (password !== confirmPassword) {
    res.status(200).json({ message: "Password doesn't match." });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    phone_code: phoneCode,
    email: email,
    password: hashedPassword,
  };
  try {
    await createTable(userSchema);
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(200).json({ message: "Email already exists" });
    } else {
      await insertRecord("users", user);
      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (req.body.fromPlatform === undefined) {
    req.body.fromPlatform = "dashboard";
  }

  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    var existingUser;
    if (req.body.fromPlatform === "admin") {
      existingUser = await checkRecordExists("users", "email", email, {
        email: email,
        is_admin: 1,
      });
    } else {
      existingUser = await checkRecordExists("users", "email", email, {
        email: email,
        is_admin: 0,
      });
    }

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        const token = generateAccessToken(existingUser.id);
        await updateRecord("users", { access_token: token }, existingUser.id);
        res.status(200).json({
          user: {
            id: existingUser.id,
            firstName: existingUser.first_name,
            lastName: existingUser.last_name,
            phone: existingUser.phone_number,
            email: existingUser.email,
          },
          access_token: token,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await checkRecordExists("users", "email", email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + 1 * 60 * 60 * 1000);
    const token = generatePasswordResetToken(user.id);

    await createTable(resetPasswordTokensSchema);

    const resetPasswordTokens = await checkRecordExists(
      "password_reset_tokens",
      "user_id",
      user.id
    );

    if (!resetPasswordTokens) {
      await insertRecord("password_reset_tokens", {
        user_id: user.id,
        token: token,
        expires_at: expiryTime,
      });
    } else {
      await updateRecord("password_reset_tokens", {
        token: token,
        expires_at: expiryTime,
      });
    }

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<p>Access this <a href="${process.env.REACT_APP_URL}/reset-password/${token}">link</a> to reset your password</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "A confirmation link has been sent to your email. Please check your email",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyResetPasswordToken = async (req, res) => {
  const token = req.params.token;

  try {
    const resetPasswordTokens = await checkRecordExists(
      "password_reset_tokens",
      "token",
      token
    );

    if (!resetPasswordTokens) {
      return res.status(200).json({
        success: false,
        message: "You don't have permission.",
      });
    }

    if (resetPasswordTokens.expires_at < new Date()) {
      return res.status(200).json({
        success: false,
        message: "Token expired.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Success",
      token: resetPasswordTokens.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword === "" || confirmPassword === "") {
      return res.status(200).json({ message: "Please fill all fields." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(200).json({ message: "Password doesn't match." });
    }

    if (newPassword.length < 8) {
      return res
        .status(200)
        .json({ message: "Password must be at least 8 characters long." });
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(newPassword)) {
      return res.status(200).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatePassword = await updateRecord("users", {
      password: hashedPassword,
    });

    if (updatePassword) {
      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Something went wrong, try again later.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  forgetPassword,
  verifyResetPasswordToken,
  resetPassword,
};
