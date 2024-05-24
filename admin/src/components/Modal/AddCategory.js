import React, { useState } from "react";
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
} from "mdb-react-ui-kit";
import { addCategory } from "../../APIs";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddCategory = ({ optModal, setOptModal, toggleOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCategory({ name, description }).then((res) => {
      console.log(res);
      if (res.success) {
        setOptModal(false);
        toast(res.message);
      } else {
        toast(`Error: ${res.message}`);
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
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    id="form6Example1"
                    label="Category name"
                    name="name"
                    className="mb-4"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <MDBTextArea
                    wrapperClass="mb-4"
                    name="description"
                    id="form6Example3"
                    label="Category description"
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
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
