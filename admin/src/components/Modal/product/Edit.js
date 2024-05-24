import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import {
  editProduct,
  getCategories,
  getDiscounts,
  getProductById,
  getProducts,
} from "../../../APIs";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";

export const Edit = ({ optModal, setOptModal, setProducts, productId }) => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    sku: "",
    price: 0,
    category: "",
    discount: "",
    quantity: 0,
    file_id: "",
    inventory_id: "",
  });

  const CustomTimeInput = ({ date, value, onChange }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  );

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [hasDiscountExpiry, setHasDiscountExpiry] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const handleFileEvent = (e) => {
    const chosenFiles = Array.from(e.target.files);
    setUploadedFiles(chosenFiles);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    const parsedValue = name === "quantity" ? parseInt(value, 10) : value;

    setInputs((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append(`uploadedFiles`, file);
    });

    for (const [key, value] of Object.entries(inputs)) {
      formData.append(key, value);
    }

    if (hasDiscountExpiry) {
      const formattedEndDate = new Date(endDate)
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);
      formData.append("discountExpiryDate", formattedEndDate);
      formData.append("hasDiscountExpiry", 1);
    } else {
      formData.append("discountExpiryDate", "");
      formData.append("hasDiscountExpiry", 0);
    }

    editProduct(productId, formData).then(async (res) => {
      if (res.success) {
        toast.success(res.message, {
          className: "top-right",
        });

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
    if (productId !== "") {
      getProductById(productId).then(async (res) => {
        if (res.success) {
          const product =
            Object.keys(res?.product).length > 0
              ? res.product[Object.keys(res.product)[0]]
              : {};

          setInputs({
            name: product.name || "",
            description: product?.description || "",
            sku: product?.SKU || "",
            price: product?.price || "",
            category: product?.category_id || "",
            discount: product?.discount_id || "",
            quantity: product?.quantity || 0,
            file_id: product?.file_id || "",
            inventory_id: product?.inventory_id || "",
          });

          setHasDiscountExpiry(product?.has_discount_expiry);
          setEndDate(product?.discount_expiry);
        }
      });
    }
  }, [productId]);

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
              <MDBModalTitle>Edit Product</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setOptModal(false)}
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
                        value={inputs.name}
                        autocomplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        id="form6Example2"
                        name="sku"
                        label="SKU"
                        value={inputs.sku}
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
                        value={inputs.price}
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
                            <option
                              key={i}
                              value={category.id}
                              selected={
                                category.id === inputs.category
                                  ? "selected"
                                  : ""
                              }
                            >
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
                            <option
                              key={i}
                              value={discount.id}
                              selected={
                                discount.id === inputs.discount
                                  ? "selected"
                                  : ""
                              }
                            >
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
                        value={inputs.quantity}
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
                        value={hasDiscountExpiry}
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
                    value={inputs.description}
                    autocomplete="off"
                  />

                  <MDBBtn className="mb-4" type="submit" block>
                    Edit Product
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
