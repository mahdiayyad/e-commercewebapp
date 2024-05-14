const express = require("express");
const auth = require("../middleware/auth");
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
router.post("/product", auth, addProduct);
router.put("/product/:id", auth, editProduct);
router.delete("/product/:id", auth, deleteProduct);

/* Discounts Routes */
router.get("/get-all-discounts", auth, getAllDiscounts);
router.get("/discount", auth, getDiscountById);
router.post("/discount", auth, addDiscount);
router.put("/discount/:id", auth, editDiscount);
router.delete("/discount/:id", auth, deleteDiscount);

module.exports = router;
