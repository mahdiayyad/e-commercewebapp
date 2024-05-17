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
} from "mdb-react-ui-kit";

export const AddCategory = ({ optModal, setOptModal, toggleOpen }) => {
  return (
    <>
      <MDBModal
        open={optModal}
        tabIndex="-1"
        onClose={() => setOptModal(false)}
      >
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Category</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="container w-75">
                <form>
                  <MDBInput
                    id="form6Example1"
                    label="Category name"
                    name="name"
                    className="mb-4"
                  />
                  <MDBTextArea
                    wrapperClass="mb-4"
                    name="description"
                    id="form6Example3"
                    label="Category description"
                    rows={5}
                  />

                  <MDBBtn className="mb-4" type="submit" block>
                    Add Category
                  </MDBBtn>
                </form>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
