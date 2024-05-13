import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <MDBContainer className="p-3 d-flex flex-column w-50 justify-content-center h-100">
      <h2 className="my-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
        />

        <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
      </form>
    </MDBContainer>
  );
};
