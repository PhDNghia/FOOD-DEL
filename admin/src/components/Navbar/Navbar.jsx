import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const { logout } = useContext(StoreContext);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
      <p className="logout" onClick={() => logout()}>
        Logout
      </p>
    </div>
  );
};

export default Navbar;
