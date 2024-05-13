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
import { AddProduct } from "../components/Modal/AddProduct";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [optModal, setOptModal] = useState(false);

  const toggleOpen = () => setOptModal(!optModal);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.products);
        console.log(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
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

  return (
    <div className="container">
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
              <i className="fa-solid fa-image"></i>
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
          ) : (
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
                  <img
                    src={product.images[0]}
                    alt=""
                    style={{ width: "60px", height: "60px" }}
                    className=""
                  />
                </td>
                <td>
                  <div className="m-2">
                    <p className="fw-bold mb-1">{product.title}</p>
                  </div>
                </td>
                <td>
                  <MDBBadge color="success" pill>
                    In stock
                  </MDBBadge>{" "}
                  ({product.stock})
                </td>
                <td>
                  <p className="fw-bold mb-1">${product.price}</p>
                </td>
                <td>
                  <p className="fw-bold mb-1">{`${product.category
                    .toUpperCase()
                    .charAt(0)}${product.category.slice(1)}`}</p>
                </td>
                <td>
                  <MDBBtn color="link" rounded size="sm">
                    Edit
                  </MDBBtn>
                </td>
              </tr>
            ))
          )}
        </MDBTableBody>
      </MDBTable>
      <nav aria-label="" className="pb-2 pt-1">
        <MDBPagination className="mb-0 justify-content-end">
          {renderPaginationNumbers()}
        </MDBPagination>
      </nav>

      <AddProduct
        optModal={optModal}
        setOptModal={setOptModal}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};
