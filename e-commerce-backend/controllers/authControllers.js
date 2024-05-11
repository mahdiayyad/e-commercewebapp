const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
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
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    name,
    email,
    password: hashedPassword,
  };
  try {
    await createTable(userSchema);
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
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
            name: existingUser.name,
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

module.exports = {
  register,
  login,
  getUser,
};
