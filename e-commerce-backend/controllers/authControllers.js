const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
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
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

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
        await updateRecord("users", { access_token: token });
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

const getUser = async (req, res) => {
  const token = req.query.token;
  const user = await checkRecordExists("users", "access_token", token);

  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  return res.status(200).json({
    user: user,
    message: "User found!",
  });
};

const forgetPassword = async (req, res) => {
  const email = req.body.email;
  const user = await checkRecordExists("users", "email", email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Testing email",
    text: `Test Reset link`,
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
};

module.exports = {
  register,
  login,
  getUser,
  forgetPassword,
};
