import { Link, useLocation } from "react-router-dom";

export const SideNav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pages = [
    {
      route: "/",
      name: "Main Dashboard",
    },
    {
      route: "/products",
      name: "Products",
    },
    {
      route: "/categories",
      name: "Categories",
    },
  ];
  return (
    <div>
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              {pages.map((p, index) => (
                <Link
                  key={index}
                  to={p.route}
                  className={`list-group-item list-group-item-action py-2 ripple d-flex align-items-center ${
                    p.route === pathname ? "active" : ""
                  }`}
                  aria-current="true"
                >
                  <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              data-mdb-button-init
              className="navbar-toggler"
              type="button"
              data-mdb-collapse-init
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <a className="navbar-brand" href="#">
              Logo
            </a>
            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input
                autoComplete="off"
                type="search"
                className="form-control rounded"
                placeholder='Search (ctrl + "/" to focus)'
                style={{ minWidth: "225px" }}
              />
              <span className="input-group-text border-0">
                <i className="fas fa-search"></i>
              </span>
            </form>

            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item dropdown">
                <a
                  data-mdb-dropdown-init
                  className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    1
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Some news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link me-3 me-lg-0" href="#">
                  <i className="fas fa-fill-drip"></i>
                </a>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <a className="nav-link" href="#">
                  <i className="fab fa-github"></i>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  data-mdb-dropdown-init
                  className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="flag-united-kingdom flag m-0"></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-united-kingdom flag"></i>English
                      <i className="fa fa-check text-success ms-2"></i>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-poland flag"></i>Polski
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-china flag"></i>中文
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-japan flag"></i>日本語
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-germany flag"></i>Deutsch
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-france flag"></i>Français
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-spain flag"></i>Español
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-russia flag"></i>Русский
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-portugal flag"></i>Português
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  data-mdb-dropdown-init
                  className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                    className="rounded-circle"
                    height="22"
                    alt="Avatar"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};
