import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const gotologout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <nav
      className="navbar fixed-top"
      style={{ backgroundColor: "#e3f2fd" }}
      data-bs-theme="light"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="!#">
          Navbar
        </a>
        <div className="d-flex">
          <button type="button" className="dropdown-item" onClick={gotologout}>
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
