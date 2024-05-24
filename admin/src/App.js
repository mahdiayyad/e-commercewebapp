import logo from "./logo.svg";
import "./App.css";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";
import NoPage from "./pages/NoPage";
import { SideNav } from "./components/SideNav";
import { AnonymousRoute, RequireAuth } from "./middleware/Auth";
import { PageLoader } from "./components/PageLoader";
import AuthProvider from "./hooks/AuthProvider";
import { useEffect, useState } from "react";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      <Router>
        {loading ? (
          <PageLoader />
        ) : (
          <AuthProvider>
            {user && <SideNav />}
            <div className="container pt-4 mt-5">
              <Routes>
                <Route element={<AnonymousRoute />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<RequireAuth />}>
                  <Route path="*" element={<NoPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/categories" element={<Categories />} />
                </Route>
              </Routes>
            </div>
          </AuthProvider>
        )}
      </Router>
    </div>
  );
}

export default App;
