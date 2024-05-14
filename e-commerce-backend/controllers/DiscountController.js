const discountSchema = require("../schemas/discountSchema");
const {
  checkRecordExists,
  createTable,
  insertRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} = require("../utils/sqlFunctions");
const tableName = "discount";

const getDiscountById = async (req, res) => {
  try {
    const { id } = req.query;
    const discount = await checkRecordExists(tableName, "id", id);

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Discount found",
      discount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await getAllRecords(tableName);

    if (!discounts) {
      return res.status(404).json({
        success: false,
        message: "Discounts not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discounts found",
      discounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addDiscount = async (req, res) => {
  try {
    const { name, description, discountPercent, active } = req.body;
    await createTable(discountSchema);

    const insertDiscount = await insertRecord(tableName, {
      name: name,
      description: description,
      discount_percent: discountPercent,
      active: active,
    });

    if (!insertDiscount) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    const getDiscount = await checkRecordExists(
      tableName,
      "id",
      insertDiscount.insertId
    );

    if (!getDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Discount added successfully",
      getDiscount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editDiscount = async (req, res) => {
  try {
    const { name, description, discountPercent, active } = req.body;
    const { id } = req.params;
    const getDiscount = await checkRecordExists(tableName, "id", id);

    if (!getDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (discountPercent !== undefined)
      updateData.discount_percent = discountPercent;
    if (active !== undefined) updateData.active = description;

    const Discount = await updateRecord(tableName, updateData, id);

    if (!Discount) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const getDiscount = await checkRecordExists(tableName, "id", id);

    if (!getDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    const deleteDiscount = await deleteRecord(tableName, parseInt(id));

    if (!deleteDiscount) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllDiscounts,
  addDiscount,
  editDiscount,
  deleteDiscount,
  getDiscountById,
};
