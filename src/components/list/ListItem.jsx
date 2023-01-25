import React, { useState } from "react";
import ToolTip from "./ToolTip";
import Info from "./Info";
import { BsTrash } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { ImAlarm } from "react-icons/im";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { format, addDays } from "date-fns";
import Calendar from "../calender/Calendar";
import "@szhsin/react-menu/dist/index.css";
import "react-spring-bottom-sheet/dist/style.css";
import TimeKeeper from "react-timekeeper";

const ListItem = ({
  listItem,
  delete_task,
  complete_task,
  updatePriority,
  updateDueDate,
  updateReminderTime,
  saveTask,
}) => {
  const [isCalenderopen, setOpenCalender] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(listItem.name);
  const [updatedPriority, setUpdatedPriority] = useState(listItem.priority);
  const [reminderTime, setReminderTime] = useState("12:00PM");
  const date = new Date();

  const completeTask = () => {
    complete_task(listItem);
  };
  const openCalender = () => {
    setOpenCalender(!isCalenderopen);
  };
  // const closeCalender = () => {
  //   setOpenCalender(false);

  // };
  const openSheet = () => {
    setOpen(true);
  };
  const closeSheet = () => {
    setOpen(false);
  };
  const updateDate = (date) => {
    updateDueDate(listItem, date);
  };
  const Time = (date) => {
    setReminderTime(date);
    updateReminderTime(listItem, date);
  };
  const save_task_item = () => {
    saveTask(listItem, updatedName, updatedPriority);
    closeSheet();
  };

  const svg_ele = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      data-reach-tooltip-trigger=""
      className="icon"
      onClick={openCalender}
    >
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm10 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM7 8h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
      ></path>
    </svg>
  );

  const sheet = (
    <BottomSheet
      open={open}
      onDismiss={closeSheet}
      footer={
        <div className="l-info-actions">
          <button
            className="l-info-btn l-info-btn-save"
            onClick={save_task_item}
          >
            <span>save</span>
          </button>
          <button className="l-info-btn l-info-btn-cancel" onClick={closeSheet}>
            <span>cancel</span>
          </button>
        </div>
      }
      snapPoints={({ maxHeight }) => [maxHeight]}
    >
      <Info
        listItem={listItem}
        priority={updatePriority}
        name={updatedName}
        setupdateName={setUpdatedName}
        updatedPriority={updatedPriority}
        setUpdatedPriority={setUpdatedPriority}
        completeTask={completeTask}
      />
    </BottomSheet>
  );

  return (
    <>
      <div className={`list-items ${listItem.priority}`}>
        <div className="item-info">
          <ToolTip
            content={
              listItem.completed ? "Mark as not completed" : "Mark as completed"
            }
          >
            <button
              onClick={completeTask}
              className="complete-btn "
              aria-label="complete-task"
            >
              <BiCheck
                className={
                  listItem.completed ? "show-checkmark" : "hide-checkmark"
                }
              />
            </button>
          </ToolTip>
          <div className="task-name-date">
            <p
              className={
                listItem.completed ? "completed task-title" : "task-title"
              }
            >
              {listItem.name}
            </p>
            {listItem["due-date"] !== "null" ? (
              <p className="task-due-date">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3v1H5.999V3H5v1H3v9h10V4h-2V3h-1zm1 3V5h1v2H4V5h1v1h.999V5H10v1h1zm-7 6h8V7.999H4V12z"
                  />
                </svg>
                <span>
                  {listItem["due-date"]}
                  <span className="task-reminder-time">
                    {listItem.reminder_time !== null
                      ? listItem.reminder_time
                      : ""}
                  </span>
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="task-actions">
          {/* <p className="task-reminder-time">
            {listItem.reminder_time !== null
              ? `due : ${listItem.reminder_time}`
              : ""}
          </p> */}
          <ToolTip content="Edit Task" arrow={false}>
            <p>
              <FiEdit3 size={20} className="icon" onClick={openSheet} />
            </p>
          </ToolTip>
          <ToolTip content="Set Time" arrow={false}>
            <div>
              <Menu
                menuButton={
                  <p>
                    <ImAlarm className="icon" />
                  </p>
                }
              >
                <TimeKeeper
                  date={reminderTime}
                  onChange={(data) => Time(data.formatted12)}
                />
              </Menu>
            </div>
          </ToolTip>
          <ToolTip content="Schedule Task" arrow={false}>
            <div>
              <Menu menuButton={svg_ele} transition>
                <MenuItem onClick={() => updateDate(format(date, "PP"))}>
                  <span>Today</span> <span>{format(date, "ccc")}</span>
                </MenuItem>
                <MenuItem
                  onClick={() => updateDate(format(addDays(date, 1), "PP"))}
                >
                  <span>Tomorrow</span>
                  <span>{format(addDays(date, 1), "ccc")}</span>
                </MenuItem>

                <Calendar updateDate={updateDate} />
                <MenuItem onClick={() => updateDate("null")}>
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
          </ToolTip>

          <ToolTip content="Delete Task" arrow={false}>
            <p>
              <BsTrash
                className="icon-trash"
                size={18}
                onClick={() => delete_task(listItem.id)}
              />
            </p>
          </ToolTip>
        </div>
      </div>

      
      {sheet}
    </>
  );
};

export default ListItem;
