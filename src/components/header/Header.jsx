import React from "react";
import "./header.css";
import { BiSort } from "react-icons/bi";

const Header = ({ title }) => {
  return (
    <div className="header">
      <p className="title">{title}</p>
      <button className="sort">
        <BiSort />
        Sort by
      </button>
    </div>
  );
};

export default Header;
