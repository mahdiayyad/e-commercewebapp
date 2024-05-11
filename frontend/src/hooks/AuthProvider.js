import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("site"));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (payload) => {
    axios
      .post(`${apiUrl}/login`, payload)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setToken(res.data.access_token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("site", res.data.access_token);
          setError("");
          navigate("/dashboard");
          return;
        }

        throw new Error(res.message);
      })
      .catch((error) => {
        setError(error?.response.data.error);
      });
  };

  const register = (payload) => {
    if (
      payload.firstName === "" &&
      payload.lastName === "" &&
      payload.email === "" &&
      payload.phoneNumber === "" &&
      payload.phoneCode === "" &&
      payload.password === "" &&
      payload.confirmPassword === ""
    ) {
      setError("Please fill all fields");
      return;
    }

    if (payload.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(payload.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    axios.post(`${apiUrl}/register`, payload).then((res) => {
      if (res.status === 201) {
        setError("");
        navigate("/login");
        return;
      } else {
        setError(res.data.message);
      }
    });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logOut, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
