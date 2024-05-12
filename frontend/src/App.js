import "./App.css";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import NoPage from "./pages/NoPage";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import AuthProvider from "./hooks/AuthProvider";
import { RequireAuth, AnonymousRoute } from "./middleware/Auth";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { Breadcrumbs } from "./components/Breadcrumbs";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Contact } from "./pages/Contact";
import { useEffect, useState } from "react";
import { PageLoader } from "./components/PageLoader";
import { ResetPassword } from "./pages/Auth/ResetPassword";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2300);

    return () => clearTimeout(timeout);
  }, []);

  const breadcrumbs = [
    { label: "Contact", link: "/contact-us" },
    { label: "About", link: "/about-us" },
    { label: "404 Error", link: "*" },
  ];
  return (
    <div className="app">
      <Router>
        {loading ? (
          <PageLoader />
        ) : (
          <AuthProvider>
            <Header />
            <div className="container">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="container content">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<NoPage />}></Route>
                <Route path="/about-us" element={<About />}></Route>
                <Route path="/contact-us" element={<Contact />}></Route>
                <Route element={<AnonymousRoute />}>
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  ></Route>
                </Route>
                <Route
                  path="/forget-password"
                  element={<ForgetPassword />}
                ></Route>

                <Route element={<RequireAuth />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>

            <Footer />
          </AuthProvider>
        )}
      </Router>
    </div>
  );
}

export default App;
