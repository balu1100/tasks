import React, { useEffect, useContext } from "react";
import "./inbox.css";
import { fetch_todos } from "../../services/data/todos";
import List from "../list/List";
import Header from "../header/Header";
import { taskContext } from "../../context/taskContext";

function Inbox() {
  // const [tasks, setTasks] = useState([]);
  const con = useContext(taskContext);
  useEffect(() => {
    let todos = JSON.parse(window.localStorage.getItem("tasks"));

    if (todos === null || todos.length === 0) {
      fetch_todos(window.localStorage.uid).then((tasks) => {
        con.setTasks(tasks);
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    } else {
      con.setTasks(todos);
    }
  }, [con.setTasks]);

  return (
    <div>
      <Header title="Inbox" />
      <List
        tasks={con.tasks}
        setTasks={con.setTasks}
        hideForm={false}
        displayCompleted={false}
      />
    </div>
  );
}
export default Inbox;
