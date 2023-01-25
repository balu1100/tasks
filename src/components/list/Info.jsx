import React from "react";
import { BiCheck } from "react-icons/bi";
import { Menu, MenuItem } from "@szhsin/react-menu";
import Calendar from "../calender/Calendar";
import { format, addDays } from "date-fns";

const Info = ({
  listItem,
  name,
  setupdateName,
  updatedPriority,
  setUpdatedPriority,
  completeTask,
}) => {
  const date = new Date();
  const change = (e) => {
    setupdateName(e.target.value);
  };

  return (
    <div className="l-info">
      <div className="l-inp-container">
        <button
          role="checkbox"
          className="complete-btn"
          aria-checked={listItem.completed}
          onClick={completeTask}
        >
          <BiCheck
            className={listItem.completed ? "show-checkmark" : "hide-checkmark"}
          />
        </button>
        <input
          type="text"
          className="l-input-form"
          value={name}
          onChange={change}
        />
      </div>

      <p>{updatedPriority}</p>

      <Menu
        className="l-info-edit-menu"
        menuButton={<button className="l-info-p-btn">Priority</button>}
        transition
      >
        <MenuItem onClick={() => setUpdatedPriority("green")}>
          <span className="p-button p-green"></span> Low
        </MenuItem>
        <MenuItem onClick={() => setUpdatedPriority("orange")}>
          <span className="p-button p-orange"></span> Medium
        </MenuItem>
        <MenuItem onClick={() => setUpdatedPriority("red")}>
          <span className="p-button p-red"></span> High
        </MenuItem>
      </Menu>

      <Menu
        className="l-info-edit-menu"
        menuButton={<button className="l-info-p-btn">ScheduleTask</button>}
        transition
      >
        <MenuItem>
          <span>Today</span> <span>{format(date, "ccc")}</span>
        </MenuItem>
        <MenuItem>
          <span>Tomorrow</span>
          <span>{format(addDays(date, 1), "ccc")}</span>
        </MenuItem>

        <Calendar />
        <MenuItem>
          <span className="ic-cancel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 1a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
            </svg>
            <p>No Date</p>
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Info;
