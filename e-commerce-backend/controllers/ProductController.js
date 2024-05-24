const inventorySchema = require("../schemas/inventorySchema");
const productSchema = require("../schemas/productSchema");

const {
  checkRecordExists,
  createTable,
  insertRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
  getAllRelations,
} = require("../utils/sqlFunctions");
const tableName = "product";

const getProductById = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await getAllRelations(
      tableName,
      "product.*,prod_files.id AS file_id, prod_files.file_name, prod_inv.id AS inventory_id, prod_inv.quantity, prod_cat.name AS category_name, prod_cat.id AS category_id",
      {
        product_files:
          "LEFT JOIN product_files AS prod_files ON product.id = prod_files.product_id",
        product_inventory:
          "LEFT JOIN product_inventory AS prod_inv ON product.id = prod_inv.product_id",
        product_category:
          "LEFT JOIN product_category AS prod_cat ON product.category_id = prod_cat.id",
      },
      {
        WHERE: `product.id = ${id}`,
        "ORDER BY": "product.id ASC",
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product found",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllRelations(
      tableName,
      "product.*,prod_files.file_name, prod_inv.quantity, prod_cat.name AS category_name",
      {
        product_files:
          "LEFT JOIN product_files AS prod_files ON product.id = prod_files.product_id",
        product_inventory:
          "LEFT JOIN product_inventory AS prod_inv ON product.id = prod_inv.product_id",
        product_category:
          "LEFT JOIN product_category AS prod_cat ON product.category_id = prod_cat.id",
      },
      {
        "ORDER BY": "product.id ASC",
      }
    );

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products found",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      sku,
      price,
      category,
      discount,
      quantity,
      discountExpiryDate,
      hasDiscountExpiry,
    } = req.body;

    await createTable(productSchema);
    const insertProduct = await insertRecord(tableName, {
      name: name,
      description: description,
      SKU: sku,
      price: price,
      category_id: category,
      discount_id: discount,
      has_discount_expiry: hasDiscountExpiry,
      discount_expiry: discountExpiryDate !== "" ? discountExpiryDate : null,
    });

    if (!insertProduct) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    await createTable(inventorySchema);
    const insertInventory = await insertRecord("product_inventory", {
      quantity: quantity,
      product_id: insertProduct?.insertId,
    });

    if (!insertInventory) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    const insertFiles = req.files.map((file) => {
      insertRecord("product_files", {
        file_name: file.filename,
        product_id: insertProduct.insertId,
        file_destination: file.destination,
        file_original_name: file.originalname,
        file_path: file.path,
        file_size: file.size,
        file_mimetype: file.mimetype,
      });
    });

    if (!insertFiles) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    const getProduct = await checkRecordExists(
      tableName,
      "id",
      insertProduct.insertId
    );

    if (!getProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      getProduct,
      insertFiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      inventory_id,
      discountId,
      quantity,
      file_id,
      discountExpiryDate,
      hasDiscountExpiry,
    } = req.body;

    const { id } = req.params;
    const getProduct = await checkRecordExists(tableName, "id", id);

    if (!getProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (categoryId !== undefined) updateData.category_id = categoryId;
    if (discountId !== undefined) updateData.discount_id = discountId;
    if (hasDiscountExpiry !== undefined)
      updateData.has_discount_expiry = hasDiscountExpiry;
    if (discountExpiryDate !== undefined)
      updateData.discount_expiry =
        discountExpiryDate !== "" ? discountExpiryDate : null;

    const updateQuantity = await updateRecord(
      "product_inventory",
      {
        quantity: quantity,
      },
      inventory_id
    );

    if (!updateQuantity) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    const Product = await updateRecord(tableName, updateData, id);

    if (!Product) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    if (file_id !== "") {
      const updateFile = req.files.map((file) => {
        updateRecord(
          "product_files",
          {
            file_name: file.filename,
            file_destination: file.destination,
            file_original_name: file.originalname,
            file_path: file.path,
            file_size: file.size,
            file_mimetype: file.mimetype,
          },
          file_id
        );
      });

      if (!updateFile) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong, try again later",
        });
      }
    } else {
      const insertFiles = req.files.map((file) => {
        insertRecord("product_files", {
          file_name: file.filename,
          product_id: id,
          file_destination: file.destination,
          file_original_name: file.originalname,
          file_path: file.path,
          file_size: file.size,
          file_mimetype: file.mimetype,
        });
      });

      if (!insertFiles) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong, try again later",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await checkRecordExists(tableName, "id", id);

    if (!getProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const deleteProduct = await deleteRecord(tableName, parseInt(id));

    if (!deleteProduct) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
};
