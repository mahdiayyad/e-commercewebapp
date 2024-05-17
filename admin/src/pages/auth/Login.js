import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useAuth } from "../../hooks/AuthProvider";
import Loader from "../../components/Loader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);
  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    setLoader(true);
    e.preventDefault();
    auth?.login({ email: email, password: password });
    setLoader(false);
  };

  return (
    <MDBContainer className="p-3 d-flex flex-column w-50 justify-content-center h-100">
      <h2 className="my-4">Admin Login</h2>
      <form onSubmit={handleSubmitEvent}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass={auth?.error !== "" ? "" : "mb-4"}
          label="Password"
          id="form2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <MDBRow>
          <MDBCol className={auth?.error !== "" ? "mb-4 text-start" : ""}>
            <span className="error-messages">
              {auth?.error !== "" ? auth?.error : ""}
            </span>
          </MDBCol>
        </MDBRow>

        <MDBBtn className="mb-4 w-100">
          {loader ? <Loader className="spinner" /> : "Sign in"}
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};
