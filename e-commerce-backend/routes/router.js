const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = "public/uploads/products";
    try {
      await fs.promises.mkdir(dir, { recursive: true });
      cb(null, dir);
    } catch (err) {
      cb(err, dir);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const {
  register,
  login,
  forgetPassword,
  verifyResetPasswordToken,
  resetPassword,
} = require("../controllers/AuthController");
const {
  getAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/CategoryController");
const {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const {
  getAllDiscounts,
  getDiscountById,
  addDiscount,
  editDiscount,
  deleteDiscount,
} = require("../controllers/DiscountController");
const router = express.Router();

/* Auth Routes */
router.post("/register", register);
router.post("/login", login);
router.post("/forgetPasssword", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-reset-token/:token", verifyResetPasswordToken);

/* Categories Routes */
router.get("/get-all-categroies", auth, getAllCategories);
router.get("/category", auth, getCategoryById);
router.post("/category", auth, addCategory);
router.put("/category/:id", auth, editCategory);
router.delete("/category/:id", auth, deleteCategory);

/* Products Routes */
router.get("/get-all-products", auth, getAllProducts);
router.get("/product", auth, getProductById);
router.post("/product", upload.array("uploadedFiles"), auth, addProduct);
router.put("/product/:id", auth, editProduct);
router.delete("/product/:id", auth, deleteProduct);

/* Discounts Routes */
router.get("/get-all-discounts", auth, getAllDiscounts);
router.get("/discount", auth, getDiscountById);
router.post("/discount", auth, addDiscount);
router.put("/discount/:id", auth, editDiscount);
router.delete("/discount/:id", auth, deleteDiscount);

module.exports = router;
