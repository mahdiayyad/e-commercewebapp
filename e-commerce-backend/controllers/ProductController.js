const inventorySchema = require("../schemas/inventorySchema");
const productSchema = require("../schemas/productSchema");

const {
  checkRecordExists,
  createTable,
  insertRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} = require("../utils/sqlFunctions");
const tableName = "product";

const getProductById = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await checkRecordExists(tableName, "id", id);

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
    const products = await getAllRecords(tableName);

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
    const { name, description, sku, price, category, discount, quantity } =
      req.body;

    await createTable(inventorySchema);
    const insertInventory = await insertRecord("product_inventory", {
      quantity: quantity,
    });

    if (!insertInventory) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    await createTable(productSchema);
    const insertProduct = await insertRecord(tableName, {
      name: name,
      description: description,
      SKU: sku,
      price: price,
      category_id: category,
      inventory_id: insertInventory?.insertId,
      discount_id: discount,
    });

    if (!insertProduct) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    const insertFiles = req.files.map(async (file) => {
      await insertRecord("product_files", {
        file_name: file.filename,
        product_id: insertProduct.insertId,
        file_destination: file.desctination,
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
      sku,
      price,
      categoryId,
      inventoryId,
      discountId,
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
    if (sku !== undefined) updateData.SKU = sku;
    if (price !== undefined) updateData.price = price;
    if (categoryId !== undefined) updateData.category_id = categoryId;
    if (inventoryId !== undefined) updateData.inventory_id = inventoryId;
    if (discountId !== undefined) updateData.discount_id = discountId;

    const Product = await updateRecord(tableName, updateData, id);

    if (!Product) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
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
