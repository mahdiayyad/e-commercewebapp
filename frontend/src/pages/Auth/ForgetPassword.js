import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../APIs";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    
    if (email !== "") {
      await forgetPassword(email).then((res) => {
        console.log(res);
        if (res.success) {
          Swal.fire({
            text: res.message,
            icon: "success",
          });
        } else {
          setError(res);
        }
      });
    } else {
      setError('Please enter your email');
    }
  };
  return (
    <div className="overflow-hidden d-flex justify-content-center">
      <div className="forget-password-container">
        <div className="row g-0">
          <div className="col-12">
            <div>
              <span style={{ fontSize: "15px" }}>
                Enter the email address associated with your account and we'll
                send you a link to reset your password.
              </span>
            </div>
            <div>
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email" className="form__label">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <span className="error-messages">{error}</span>
                  </div>
                  <div className="col-12 my-3">
                    <button className="forget-password-btn" type="submit">
                      Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 my-3 text-center">
          <span style={{ fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              style={{ color: "#d84444", textDecoration: "none" }}
              to="/signup"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
