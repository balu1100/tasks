import React, { useState, useContext } from "react";
import { auth } from "../../services/firebase.config";
import { signout } from "../../services/auth/signout.js";
import arrow from "../../resources/down-arrow.png";
import { BiExit } from "react-icons/bi";
import { authContext } from "../../context/authcontext";

const Profile = () => {
  const setUser = useContext(authContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  let user = window.localStorage.getItem("username");
  let img = window.localStorage.getItem("img");
  const openMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const logout = () => {
    signout(auth, setUser[1]);
  };

  return (
    <div className="profile-container">
      <div className={isMenuOpen ? "menu show-menu" : "hide-menu"}>
        <p className="menu-item" onClick={logout}>
          <BiExit /> <span>logout</span>
        </p>
      </div>
      <div className="profile" onClick={openMenu}>
        <div>
          <img className="profile-image" src={img} alt={`${user}`} />
          <p className="username">{user !== null ? user : ""}</p>
        </div>
        <img
          className={isMenuOpen ? "rotate" : ""}
          src={arrow}
          id="arrow"
          alt="arrow-down"
          width="15px"
        />
      </div>
    </div>
  );
};
export default Profile;
