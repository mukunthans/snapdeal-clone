import React from "react";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-left-side">
        <p>Brand Wali Quality Bazar Wali Deal!</p>
      </div>
      <div className="nav-right-side">
        <a>impact@snapdeal</a>
        <a>Help Center</a>
        <a>DownLoad App</a>
      </div>
    </div>
  );
};

export default NavBar;
