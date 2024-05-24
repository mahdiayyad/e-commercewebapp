const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const cors = require("cors");
const connectDB = require("./db/db");
const PORT = process.env.PORT;
const routes = require("./routes/router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "public", "uploads", "products"))
);
app.use("/", routes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
