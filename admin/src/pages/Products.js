import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBPagination,
} from "mdb-react-ui-kit";

import Loader from "../components/Loader";
import { Add } from "../components/Modal/product/Add";
import { deleteProduct, getProducts } from "../APIs";
import { Edit } from "../components/Modal/product/Edit";
import Swal from "sweetalert2";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [optModal, setOptModal] = useState(false);
  const [optEditModal, setOptEditModal] = useState(false);
  const [id, setProductId] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const toggleOpen = () => setOptModal(!optModal);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getProducts();
        if (!response.success) {
          throw new Error("Network response was not ok");
        }
        setProducts(response.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getAllProducts();
  }, []);

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const maxPagesToShow = 5; // Maximum number of pages to show in the pagination

    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      // Less than or equal to the maximum pages to show
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than maximum pages to show
      const middlePage = Math.ceil(maxPagesToShow / 2);
      if (currentPage <= middlePage) {
        // Near the beginning
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + middlePage > totalPages) {
        // Near the end
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        // Somewhere in the middle
        startPage =
          currentPage - middlePage + (maxPagesToShow % 2 === 0 ? 1 : 0);
        endPage = currentPage + middlePage - 1;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const renderPaginationNumbers = () => {
    const pageNumbers = generatePageNumbers();

    return (
      <>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink
            onClick={() => paginate(currentPage - 1)}
            tabIndex={-1}
            aria-disabled="true"
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {pageNumbers.map((pageNumber, index) => (
          <MDBPaginationItem key={index} active={pageNumber === currentPage}>
            <MDBPaginationLink onClick={() => paginate(pageNumber)}>
              {pageNumber}
              {pageNumber === currentPage && (
                <span className="visually-hidden">(current)</span>
              )}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
        >
          <MDBPaginationLink onClick={() => paginate(currentPage + 1)}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </>
    );
  };

  // Get current products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteItem = (product_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b71ca",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product_id).then(async (res) => {
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: res.message,
              icon: "success",
            });

            await getProducts().then((res) => {
              setProducts(res.products);
            });
          } else {
            Swal.fire({
              title: "Deleted!",
              text: res,
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <div className="container" style={{ paddingLeft: "200px" }}>
      <div className="text-end mb-5">
        <MDBBtn onClick={toggleOpen}>Add Product</MDBBtn>
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col" className="text-start">
              <MDBCheckbox name="flexCheck" value="" id="checkAll" />
            </th>
            <th scope="col">
              <i className="fa-solid fa-image fs-5"></i>
            </th>
            <th scope="col">Name</th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Brands</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {loading ? (
            <tr>
              <td colSpan="7">
                <Loader />
              </td>
            </tr>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <tr key={index}>
                <td className="text-start">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id={`check_${product.id}`}
                  />
                </td>
                <td>
                  {product.file_name !== null ? (
                    <img
                      src={`${apiUrl}/uploads/products/${product.file_name}`}
                      alt={product.file_name}
                      style={{ width: "60px", height: "60px" }}
                      className=""
                    />
                  ) : (
                    "Not uploaded yet"
                  )}
                </td>
                <td>
                  <div className="m-2">
                    <p className="fw-bold mb-1">{product.name}</p>
                  </div>
                </td>
                <td>
                  <MDBBadge
                    color={product.quantity > 0 ? "success" : "danger"}
                    pill
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </MDBBadge>{" "}
                  ({product.quantity})
                </td>
                <td>
                  <p className="fw-bold mb-1">${product.price}</p>
                </td>
                <td>
                  <p className="fw-bold mb-1">{product.category_name}</p>
                </td>
                <td>
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => {
                      setOptEditModal(!optEditModal);
                      setProductId(product?.id);
                    }}
                  >
                    <i
                      className="fa-solid fa-pen fs-6"
                      style={{ color: "#3b71ca" }}
                    ></i>
                  </MDBBtn>
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => handleDeleteItem(product?.id)}
                  >
                    <i
                      className="fa-solid fa-trash fs-6"
                      style={{ color: "#3b71ca" }}
                    ></i>
                  </MDBBtn>
                </td>
              </tr>
            ))
          ) : (
            <>
              <div style={{ position: "relative", left: "438px", top: "17px" }}>
                No products found
              </div>
            </>
          )}
        </MDBTableBody>
      </MDBTable>
      <nav aria-label="" className="pb-2 pt-1">
        <MDBPagination className="mb-0 justify-content-end">
          {renderPaginationNumbers()}
        </MDBPagination>
      </nav>

      <Add
        optModal={optModal}
        setOptModal={setOptModal}
        toggleOpen={toggleOpen}
        setProducts={setProducts}
      />

      <Edit
        optModal={optEditModal}
        setOptModal={setOptEditModal}
        setProducts={setProducts}
        productId={id}
      />
    </div>
  );
};
