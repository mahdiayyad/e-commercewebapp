import React, { useState } from "react";
import sideImage from "../../assets/img/side-image.png";
import googleIcon from "../../assets/img/Icon-Google.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

export const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(input);
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.name !== "" && input.email !== "" && input.password !== "") {
      auth.register(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="signup-container my-5 overflow-hidden">
      <div className="row">
        <div className="col-lg-6">
          <div className="sideimg-container signup-img">
            <img
              src={sideImage}
              alt="sideimage"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 d-flex align-items-center flex-column justify-content-center">
          <div className="signup-form">
            <h1>Create an account</h1>
            <p>Enter your details below</p>
            <form onSubmit={handleSubmitEvent}>
              <div className="row">
                <div className="col-12 my-3">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={handleInput}
                    />
                    <label htmlFor="name" className="form__label">
                      Name
                    </label>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleInput}
                    />
                    <label htmlFor="email" className="form__label">
                      Email
                    </label>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleInput}
                    />
                    <label htmlFor="password" className="form__label">
                      Password
                    </label>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button className="signup-btn">Sign up</button>
                </div>
              </div>
            </form>
          </div>

          <div
            className="d-grid align-items-center justify-content-center"
            style={{ gridTemplateColumns: "350px" }}
          >
            <div className="row">
              <div className="col-12">
                <button className="signgoogle-btn">
                  <img
                    src={googleIcon}
                    alt="googleicon"
                    width={19}
                    style={{ marginRight: "5px" }}
                  />
                  Sign up with Google
                </button>
              </div>
              <div className="col-12 text-center my-4">
                <p>
                  Already have account?{" "}
                  <span>
                    <Link
                      to="/login"
                      style={{ textUnderlineOffset: "7px", color: "#000" }}
                    >
                      Log in
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
