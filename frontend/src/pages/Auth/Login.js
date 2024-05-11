import React, { useState } from "react";
import sideImage from "../../assets/img/side-image.png";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    auth.login(input);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-container my-5 overflow-hidden">
      <div className="row">
        <div className="col-lg-6 login-img">
          <div className="sideimg-container">
            <img
              src={sideImage}
              alt="sideimage"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 d-flex align-items-center flex-column justify-content-center">
          <div className="login-form">
            <h1>Log in to Exclusive</h1>
            <p>Enter your details below</p>
            <form action="" onSubmit={handleSubmitEvent}>
              <div className="row">
                <div className="col-12">
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
                <div className="col-12">
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
                <div className="col-12">
                  <span className="error-messages">
                    {auth?.error !== "" ? auth?.error : ""}
                  </span>
                </div>
                <div className="col-12 my-3">
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div
            className="d-grid align-items-center justify-content-center"
            style={{ gridTemplateColumns: "350px" }}
          >
            <div className="row">
              <div className="col-12 text-end">
                <p>
                  <Link
                    to="/forget-password"
                    style={{ color: "#DB4444", textDecoration: "none" }}
                  >
                    Forget Password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
