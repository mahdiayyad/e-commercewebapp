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
import { AddCategory } from "../components/Modal/AddCategory";
import { getCategories } from "../APIs";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [optModal, setOptModal] = useState(false);
  const [expandedState, setExpandedState] = useState({});

  const toggleExpansion = (categoryId) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const renderDescription = (category) => {
    const isExpanded = expandedState[category.id];
    if (isExpanded || category.description.length <= 100) {
      return category.description;
    } else {
      return `${category.description.substring(0, 100)}...`;
    }
  };

  const toggleOpen = () => setOptModal(!optModal);

  useEffect(() => {
    const getCategoriesFromAPI = async () => {
      try {
        const response = await getCategories();
        if (!response.success) {
          throw new Error("Network response was not ok");
        }

        setCategories(response.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategoriesFromAPI();
  }, []);

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(categories.length / itemsPerPage);
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
          disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}
        >
          <MDBPaginationLink onClick={() => paginate(currentPage + 1)}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </>
    );
  };

  // Get current categories
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container" style={{ paddingLeft: "200px" }}>
      <div className="text-end mb-5">
        <MDBBtn onClick={toggleOpen}>Add Category</MDBBtn>
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col" className="text-start">
              <MDBCheckbox name="flexCheck" value="" id="checkAll" />
            </th>
            <th scope="col text" className="text-start">
              Name
            </th>
            <th scope="col" className="text-start">
              Description
            </th>
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
            currentCategories.map((category, index) => (
              <tr key={index}>
                <td className="text-start">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id={`check_${category.id}`}
                  />
                </td>
                <td>
                  <div className="m-2">
                    <p className="fw-bold mb-1 text-start">{category.name}</p>
                  </div>
                </td>
                <td>
                  <div className="m-2">
                    <p className="fw-bold mb-1 text-start">
                      {renderDescription(category)}
                      {category.description.length > 100 && (
                        <span
                          onClick={() => toggleExpansion(category.id)}
                          style={{
                            cursor: "pointer",
                            color: "#3b71ca",
                            fontSize: "12px",
                          }}
                        >
                          {expandedState[category.id]
                            ? " Show less"
                            : " Show more"}
                        </span>
                      )}
                    </p>
                  </div>
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

      <AddCategory
        optModal={optModal}
        setOptModal={setOptModal}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};
