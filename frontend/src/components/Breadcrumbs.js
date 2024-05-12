import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = ({ breadcrumbs }) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  return pathname === "/" ? (
    ""
  ) : (
    <>
      <div className="breadcrumbs">
        {pathname !== "/signup" &&
        pathname !== "/login" &&
        pathname !== "/forget-password" &&
        !pathname.includes("reset-password") ? (
          <>
            <Link
              style={{
                textDecoration: "none",
                color: "#000",
                opacity: "0.5",
              }}
              to="/"
            >
              Home
            </Link>
          </>
        ) : (
          ""
        )}
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index}>
            {breadcrumb.link && breadcrumb.link === pathname && (
              <span className="separator">/</span>
            )}
            {breadcrumb.link && breadcrumb.link === pathname ? (
              <>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    opacity: 1,
                  }}
                  to={breadcrumb.link}
                >
                  {breadcrumb.label}
                </Link>
              </>
            ) : (
              ""
            )}
          </span>
        ))}
      </div>
    </>
  );
};
