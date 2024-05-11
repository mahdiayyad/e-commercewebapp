import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import user from "../../assets/img/user.png";
import userSettingsImg from "../../assets/img/user-settings.png";
import ordersImg from "../../assets/img/icon-mallbag.png";
import cancellationImg from "../../assets/img/icon-cancel.png";
import reviresImg from "../../assets/img/Icon-Reviews.png";
import logoutImg from "../../assets/img/Icon-logout.png";
import hamburgerMenu from "../../assets/img/hamburger-menu.png";

const Header = () => {
  const [showList, setShowList] = useState(false);

  const location = useLocation();
  const auth = useAuth();

  const pages = [
    {
      name: "Home",
      url: "/",
      show: true,
    },
    {
      name: "Contact",
      url: "/contact-us",
      show: true,
    },
    {
      name: "About",
      url: "/about-us",
      show: true,
    },
    {
      name: "Sign Up",
      url: "/signup",
      show: auth.user ? false : true,
    },
  ];

  return (
    <header>
      <div
        className="header-container"
        style={{ borderBottom: "1px solid rgb(223 223 223)" }}
      >
        <div className="toggling-list mx-4 p-4">
          <button className="toggle-btn" onClick={() => setShowList(!showList)}>
            <img src={hamburgerMenu} alt="hamburgermenu" />
          </button>
          <ul
            className="hamburgermenu header-ul list-unstyled m-0 p-0 animate slideIn"
            style={{ display: showList ? "block" : "" }}
          >
            <li>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontWeight: "bold",
                  fontSize: "22px",
                  textShadow: "1px 1px 2px",
                }}
              >
                Exclusive
              </Link>
            </li>
            {pages.map((p, index) =>
              p.show ? (
                <>
                  <li key={index}>
                    <Link
                      to={p.url}
                      className="header-list"
                      style={{
                        textDecoration:
                          location.pathname === p.url ? "underline" : "none",
                        textUnderlineOffset: "5px",
                        color: location.pathname === p.url ? '#d84444' : ''
                      }}
                    >
                      {p.name}
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )
            )}
          </ul>
        </div>

        <ul className="header-ul d-flex m-0 align-items-center p-4">
          <li style={{ position: "relative" }}>
            <input
              className="search-input"
              type="text"
              placeholder="What are you looking for?"
            />
            <span style={{ position: "absolute", top: "7px", right: "30px" }}>
              <a href="#">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 17L13.2223 13.2156M15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789V8.15789Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </span>
          </li>
          {location.pathname === "/signup" || location.pathname === "/login" ? (
            ""
          ) : (
            <>
              <li>
                <Link to="#">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
              <li style={{ padding: "0" }}>
                <Link to="#">
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 5H7L10 22H26"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
              {auth.user ? (
                <>
                  <li>
                    <div
                      className="d-inline-block h-100"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={user} alt="user" />
                    </div>
                    <ul className="dropdown-menu settings-dropdown">
                      <li>
                        <img
                          src={userSettingsImg}
                          alt="usersettings"
                          width={27}
                          height={26}
                          style={{ position: "relative", right: "3px" }}
                        />
                        <a
                          className="dropdown-item d-inline"
                          href="#"
                          style={{ paddingLeft: "2px" }}
                        >
                          Manage My Account
                        </a>
                      </li>
                      <li>
                        <img
                          src={ordersImg}
                          alt="order"
                          width={21}
                          height={21}
                        />
                        <a className="dropdown-item d-inline" href="#">
                          My Order
                        </a>
                      </li>
                      <li>
                        <img
                          src={cancellationImg}
                          alt="cancel"
                          width={21}
                          height={21}
                        />
                        <a className="dropdown-item d-inline" href="#">
                          My Cancellations
                        </a>
                      </li>
                      <li>
                        <img
                          src={reviresImg}
                          alt="review"
                          width={30}
                          height={30}
                          style={{ position: "relative", right: "4px" }}
                        />

                        <a
                          className="dropdown-item d-inline"
                          href="#"
                          style={{ paddingLeft: "1px" }}
                        >
                          My Reviews
                        </a>
                      </li>
                      <li style={{ paddingTop: "0px" }}>
                        <img
                          src={logoutImg}
                          alt="logout"
                          width={23}
                          height={23}
                          style={{ position: "relative", right: "2px" }}
                        />
                        <a
                          className="dropdown-item d-inline"
                          href="#"
                          style={{ paddingLeft: "8px" }}
                          onClick={() => auth.logOut()}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
