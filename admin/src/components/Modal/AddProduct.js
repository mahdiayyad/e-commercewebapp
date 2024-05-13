import React, { useState } from "react";
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

export const AddProduct = ({ optModal, setOptModal, toggleOpen }) => {
  return (
    <>
      <MDBModal
        open={optModal}
        tabIndex="-1"
        onClose={() => setOptModal(false)}
      >
        <MDBModalDialog size="fullscreen">
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
              <div className="container w-75">
                <form>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput id="form6Example1" label="Product name" />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        id="form6Example2"
                        label="SKU"
                        value="Generating..."
                        disabled
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput
                        wrapperClass="mb-4"
                        id="form6Example4"
                        label="Price"
                        type="number"
                      />
                    </MDBCol>
                    <MDBCol>
                      <div className="form__group">
                        <select className="form-control">
                          <option value="" disabled selected>
                            Select Category
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                          <option value="5">Five</option>
                        </select>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol>
                      <MDBFile
                        id="customFile"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        wrapperClass="mb-4"
                        id="form6Example4"
                        label="Quantity"
                        type="number"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBTextArea
                    wrapperClass="mb-4"
                    id="form6Example3"
                    label="Product description"
                    rows={5}
                  />

                  <MDBBtn className="mb-4" type="submit" block>
                    Add Product
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
