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
import { addCategory, getCategories } from "../../../APIs";
import { ToastContainer, toast } from "react-toastify";

export const Add = ({ optModal, setOptModal, toggleOpen, setCategories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitCategory = (e) => {
    e.preventDefault();

    addCategory({ name, description }).then(async (res) => {
      if (res.success) {
        setName("");
        setDescription("");

        toast.success(res.message, {
          className: "top-right",
        });

        setTimeout(() => {
          setOptModal(false);
        }, 1000);

        await getCategories().then((res) => {
          setCategories(res.categories);
        });
      } else {
        setName("");
        setDescription("");

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
              <MDBModalTitle>Add New Category</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="container">
                <form onSubmit={handleSubmitCategory}>
                  <MDBInput
                    id="form6Example1"
                    label="Category name"
                    name="name"
                    className="mb-4"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autocomplete="off"
                  />
                  <MDBTextArea
                    wrapperClass="mb-4"
                    name="description"
                    id="form6Example3"
                    label="Category description"
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    autocomplete="off"
                  />

                  <MDBBtn className="mb-4" type="submit" block>
                    Add Category
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
