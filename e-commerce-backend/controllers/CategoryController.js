const categorySchema = require("../schemas/categorySchema");
const {
  checkRecordExists,
  createTable,
  insertRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} = require("../utils/sqlFunctions");
const tableName = "product_category";

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.query;
    const category = await checkRecordExists(tableName, "id", id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category found",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllRecords(tableName);

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories found",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await createTable(categorySchema);

    const insertCategory = await insertRecord(tableName, {
      name,
      description,
    });

    if (!insertCategory) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    const getCategory = await checkRecordExists(
      tableName,
      "id",
      insertCategory.insertId
    );

    if (!getCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      getCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const getCategory = await checkRecordExists(tableName, "id", id);

    if (!getCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const category = await updateRecord(tableName, updateData, id);

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const getCategory = await checkRecordExists(tableName, "id", id);

    if (!getCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const deleteCategory = await deleteRecord(tableName, parseInt(id));

    if (!deleteCategory) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
};
