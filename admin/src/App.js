import logo from "./logo.svg";
import "./App.css";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Products } from "./pages/Products";
import { SideNav } from "./components/SideNav";

function App() {
  return (
    <div className="App">
      <Router>
        <SideNav />
        <main style={{ marginTop: "58px" }}>
          <div className="container pt-4">
            <Routes>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
