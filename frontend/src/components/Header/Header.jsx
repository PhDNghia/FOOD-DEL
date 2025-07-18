import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigateMenu = useNavigate();

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order you favourite food here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          porro deserunt voluptates provident, vero ab, tempore animi hic dicta
          ipsam qui officia ipsa, nisi at temporibus voluptas corporis expedita
          eos?
        </p>
        <a href="/#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
