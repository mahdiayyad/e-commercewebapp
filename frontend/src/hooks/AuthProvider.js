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
          navigate("/dashboard");
          return;
        }

        throw new Error(res.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const register = (payload) => {
    console.log(apiUrl);
    axios.post(`${apiUrl}/register`, payload).then((res) => {
      if (res.status === 201) {
        navigate("/login");
        return;
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
    <AuthContext.Provider value={{ token, user, login, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
