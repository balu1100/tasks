import React, { useState } from "react";
// import { BsCalendarDate } from "react-icons/bs";
import { BiNotepad } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import ListItem from "./ListItem";
import "./sidebar.css";
import Profile from "./Profile";

const SideBar = () => {
  const [linkActive, setLinkActive] = useState("/");
  return (
    <nav className="sidebar">
      <ul>
        <ListItem
          text="Tasks"
          path="/"
          length={0}
          Icon={AiOutlineHome}
          size={19}
          linkActive={linkActive}
          setLinkActive={setLinkActive}
        />

        <ListItem
          text="completed"
          path="/completed"
          length={0}
          Icon={FiCheckCircle}
          size={17}
          linkActive={linkActive}
          setLinkActive={setLinkActive}
        />
      </ul>
      <Profile />
    </nav>
  );
};

export default SideBar;
