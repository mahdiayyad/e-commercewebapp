import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, verifyResetPasswordToken } from "../../APIs";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

export const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const verifyResetToken = async () => {
      const response = await verifyResetPasswordToken(params.token);
      if (!response.success) {
        Swal.fire({
          text: response.message,
          icon: "error",
        });
        navigate("/login");
      }
    };

    verifyResetToken();
  });

  const handleSubmitEvent = async (e) => {
    setLoader(true);
    e.preventDefault();

    const response = await resetPassword(input);
    if (response.success) {
      Swal.fire({
        text: response.message,
        icon: "success",
      }).then(() => {
        setLoader(false);
        navigate("/login");
      });
    } else {
      setError(response.message);
      setLoader(false);
    }
  };
  return (
    <div className="reset-password-container my-5 overflow-hidden">
      <div className="row">
        <div className="col-lg-12 d-flex align-items-center flex-column justify-content-center">
          <div className="reset-password-form">
            <h4>Reset Password</h4>
            <form action="" onSubmit={handleSubmitEvent}>
              <div className="row">
                <div className="col-12">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      onChange={handleInput}
                    />
                    <label htmlFor="newPassword" className="form__label">
                      New Password
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form__group field">
                    <input
                      className="form__field"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleInput}
                    />
                    <label htmlFor="confirmPassword" className="form__label">
                      Confirm Password
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <span className="error-messages">
                    {error !== "" ? error : ""}
                  </span>
                </div>
                <div className="col-12 my-3">
                  <button
                    className="reset-password-btn"
                    type="submit"
                    disabled={loader ? true : false}
                  >
                    {loader ? <Loader className="spinner" /> : "Continue"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
