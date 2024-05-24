import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import {
  addProduct,
  getCategories,
  getDiscounts,
  getProducts,
} from "../../../APIs";

import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";

export const Add = ({ optModal, setOptModal, toggleOpen, setProducts }) => {
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [discountName, setDiscountName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hasDiscountExpiry, setHasDiscountExpiry] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    category: "",
    discount: "",
    quantity: "",
  });

  const CustomTimeInput = ({ date, value, onChange }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  );

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories().then((res) => {
        if (res.success) {
          setCategories(res.categories);
        }
      });
    };

    const fetchDiscounts = async () => {
      await getDiscounts().then((res) => {
        if (res.success) {
          setDiscounts(res.discounts);
        }
      });
    };

    fetchCategories();
    fetchDiscounts();
  }, []);

  useEffect(() => {
    const generateSKU = () => {
      const sku =
        inputs.name.substring(0, 2) +
        inputs.price.substring(0, 2) +
        inputs.quantity.substring(0, 2) +
        inputs.description.substring(0, 2) +
        categoryName.substring(0, 2) +
        discountName.substring(0, 2);

      var sku1 = sku.toUpperCase();
      inputs.sku = sku1;
    };

    generateSKU();
  }, [inputs, categoryName, discountName]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => parseInt(category.id) === parseInt(value)
      );
      if (selectedCategory) {
        setCategoryName(selectedCategory.name);
      }
    } else if (name === "discount") {
      const selectedDiscount = discounts.find(
        (discount) => parseInt(discount.id) === parseInt(value)
      );
      if (selectedDiscount) {
        setDiscountName(selectedDiscount.name);
      }
    }
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.from(e.target.files);
    setUploadedFiles(chosenFiles);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append(`uploadedFiles`, file);
    });

    for (const [key, value] of Object.entries(inputs)) {
      formData.append(key, value);
    }

    if (hasDiscountExpiry) {
      const formattedEndDate = endDate
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);
      formData.append("discountExpiryDate", formattedEndDate);
      formData.append("hasDiscountExpiry", 1);
    } else {
      formData.append("discountExpiryDate", "");
      formData.append("hasDiscountExpiry", 0);
    }

    addProduct(formData).then(async (res) => {
      if (res.success) {
        toast.success(res.message, {
          className: "top-right",
        });

        setEndDate(new Date());
        setTimeout(() => {
          setOptModal(false);
        }, 1000);

        await getProducts().then((res) => {
          setProducts(res.products);
        });
      } else {
        toast.error(res.message || res, {
          className: "top-right",
        });
      }
    });
  };

  return (
    <>
      <MDBModal
        open={optModal}
        tabIndex="-1"
        onClose={() => setOptModal(false)}
      >
        <MDBModalDialog size="md">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Product</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="container">
                <form onSubmit={handleProductSubmit}>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput
                        id="form6Example1"
                        label="Product name"
                        name="name"
                        onChange={handleInput}
                        autocomplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        id="form6Example2"
                        name="sku"
                        label="SKU"
                        value={inputs.sku || "Generating..."}
                        disabled
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol>
                      <MDBInput
                        wrapperClass="mb-4"
                        name="price"
                        id="form6Example4"
                        label="Price"
                        type="number"
                        onChange={handleInput}
                        autocomplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <div className="form__group">
                        <select
                          className="form-control"
                          name="category"
                          onChange={handleInput}
                        >
                          <option value="" disabled selected>
                            Select Category
                          </option>
                          {categories.map((category, i) => (
                            <option key={i} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol>
                      <div className="form__group">
                        <select
                          className="form-control"
                          name="discount"
                          onChange={handleInput}
                        >
                          <option value="" disabled selected>
                            Select Discount
                          </option>
                          {discounts.map((discount, i) => (
                            <option key={i} value={discount.id}>
                              {discount.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        wrapperClass="mb-4"
                        name="quantity"
                        id="form6Example4"
                        label="Quantity"
                        type="number"
                        onChange={handleInput}
                        autocomplete="off"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
                    <MDBCol>
                      <MDBCheckbox
                        id="controlledCheckbox"
                        label="Has Discount Expiry?"
                        checked={hasDiscountExpiry}
                        onChange={() =>
                          setHasDiscountExpiry(!hasDiscountExpiry)
                        }
                      />
                    </MDBCol>
                  </MDBRow>

                  {hasDiscountExpiry ? (
                    <MDBRow className="mb-4">
                      <MDBCol>
                        <DatePicker
                          selected={endDate}
                          dateFormat="yyyy-MM-dd hh:mm:ss"
                          showTimeInput
                          timeFormat="HH:mm:ss"
                          minDate={new Date()}
                          customTimeInput={
                            <CustomTimeInput
                              date={new Date()}
                              value={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          }
                          onChange={(date) => setEndDate(date)}
                          name="discountExpiryDate"
                        />
                      </MDBCol>
                    </MDBRow>
                  ) : (
                    ""
                  )}

                  <MDBFile
                    className="mb-4"
                    id="customFile"
                    multiple
                    accept="image/*"
                    name="files"
                    onChange={handleFileEvent}
                  />

                  <MDBTextArea
                    wrapperClass="mb-4"
                    name="description"
                    id="form6Example3"
                    label="Product description"
                    rows={5}
                    onChange={handleInput}
                    autocomplete="off"
                  />

                  <MDBBtn className="mb-4" type="submit" block>
                    Add Product
                  </MDBBtn>
                  <ToastContainer />
                </form>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
