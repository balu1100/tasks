import React, { useEffect, useContext } from "react";
import List from "../list/List";
import Header from "../header/Header";
import { taskContext } from "../../context/taskContext";
import { fetch_completed_tasks } from "../../services/data/todos";

export default function Completed() {
  const con = useContext(taskContext);
  useEffect(() => {
    let completed = JSON.parse(window.localStorage.getItem("completed"));
    if (completed === [] || completed.length === 0) {
      fetch_completed_tasks(window.localStorage.uid).then((res) => {
        con.setCompletedTasks(res);
        window.localStorage.setItem("completed", JSON.stringify(res));
      });
    } else {
      con.setCompletedTasks(
        JSON.parse(window.localStorage.getItem("completed"))
      );
    }
  }, []);

  return (
    <div>
      <Header title="Completed" />
      <List
        tasks={con.completedTasks}
        setTasks={con.setCompletedTasks}
        hideForm={true}
        displayCompleted={true}
      />
    </div>
  );
}
