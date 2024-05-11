import React, { useState } from "react";
import sideImage from "../../assets/img/side-image.png";
import googleIcon from "../../assets/img/Icon-Google.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Signup = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    auth.register(input);
  };

  const handlePhoneChange = (value, country) => {
    console.log(value);
    const phoneNumberWithoutCode = value
      .replace(country.dialCode, "")
      .trim();

    setInput((prev) => ({
      ...prev,
      phoneNumber: phoneNumberWithoutCode,
      phoneCode: country.dialCode,
    }));
  };

  const handleInput = (fieldName, value) => {
    setInput((prev) => ({
      ...prev,
      [fieldName]: value,
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
                <div className="col-lg-6 col-sm-12 my-2 p-1">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      onChange={(e) =>
                        handleInput(e.target.name, e.target.value)
                      }
                    />
                    <label htmlFor="firstName" className="form__label">
                      First name
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 my-2 p-1">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      onChange={(e) =>
                        handleInput(e.target.name, e.target.value)
                      }
                    />
                    <label htmlFor="lastName" className="form__label">
                      Last name
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 my-2 p-1">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        handleInput(e.target.name, e.target.value)
                      }
                    />
                    <label htmlFor="email" className="form__label">
                      Email
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 my-2 p-1">
                  <div className="form__group field">
                    <PhoneInput
                      className="form__field"
                      country={"us"}
                      onChange={(value, country) =>
                        handlePhoneChange(value, country)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 my-2 p-1">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) =>
                        handleInput(e.target.name, e.target.value)
                      }
                    />
                    <label htmlFor="password" className="form__label">
                      Password
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 my-2 p-1">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        handleInput(e.target.name, e.target.value)
                      }
                    />
                    <label htmlFor="confirmPassword" className="form__label">
                      Confirm Password
                    </label>
                  </div>
                </div>
                <div className="col-12 p-1">
                  <span className="error-messages">
                    {auth?.error !== "" ? auth?.error : ""}
                  </span>
                </div>
                <div className="col-12 my-2 p-1">
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
              <div className="col-12 p-1">
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
