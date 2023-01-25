import React, { useState, useContext } from "react";
import ListItem from "./ListItem";
import "./list.css";
import {
  add_task,
  delete_task,
  complete_task,
  set_task_priority,
  update_due_date,
  update_reminder_time,
  save_task,
} from "../../services/data/todos";
import { taskContext } from "../../context/taskContext";
import toast from "react-hot-toast";

const List = ({ tasks, setTasks, hideForm, displayCompleted }) => {
  const [taskName, setTaskName] = useState("");
  const con = useContext(taskContext);
  const onNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const enter_add_task = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    let task = {
      name: taskName,
      description: "",
      completed: false,
      priority: "green",
      "due-date": "null",
      reminder_time: null,
      date_added: Date.now(),
      user: window.localStorage.getItem("uid"),
    };

    add_task(task).then((res) => {
      task["id"] = res.id;
    });
    let updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("task added successfully", { duration: 2000 });
  };
  const deleteTask = (id) => {
    delete_task(id);
    let taskitems = tasks.filter((item) => item.id !== id);
    let completed = con.completedTasks.filter((item) => item.id !== id);
    window.localStorage.setItem("tasks", JSON.stringify(taskitems));
    window.localStorage.setItem("completed", JSON.stringify(completed));
    setTasks(taskitems);
    toast.success("task deleted successfully", { duration: 2000 });
  };

  const completeTask = (task) => {
    let isCompleted = task.completed;
    if (isCompleted) {
      isCompleted = !isCompleted;
    } else {
      isCompleted = !isCompleted;
    }
    task = { ...task, completed: isCompleted };

    let updated_tasks = tasks.map((Task) => {
      if (Task.id === task.id) {
        Task.completed = isCompleted;
        return Task;
      } else {
        return Task;
      }
    });
    setTasks(updated_tasks);
    window.localStorage.setItem("tasks", JSON.stringify(updated_tasks));
    complete_task(task.id, isCompleted);
    if (isCompleted) {
      let ctasks = con.tasks.filter((task) => task.completed === isCompleted);
      con.setCompletedTasks(ctasks);
      window.localStorage.setItem("completed", JSON.stringify(ctasks));
    } else {
      let ctasks = con.completedTasks.map((Task) => {
        if (Task.id === task.id) {
          Task.completed = isCompleted;
          return Task;
        } else {
          return Task;
        }
      });
      con.setCompletedTasks(ctasks);
      window.localStorage.setItem("completed", JSON.stringify(ctasks));
    }
  };
  const updatePriority = (task, priority) => {
    set_task_priority(task.id, priority);
    task = { ...task, priority };
    let updated_tasks = tasks.map((Task) => {
      if (Task.id === task.id) {
        Task.priority = priority;
        return Task;
      } else {
        return Task;
      }
    });
    setTasks(updated_tasks);
    window.localStorage.setItem("tasks", JSON.stringify(updated_tasks));
  };
  const updateTaskDueDate = (task, due_date) => {
    update_due_date(task.id, due_date);
    task = { ...task, due_date };
    let updated_tasks = tasks.map((Task) => {
      if (Task.id === task.id) {
        Task["due-date"] = due_date;
        return Task;
      } else {
        return Task;
      }
    });
    setTasks(updated_tasks);
    window.localStorage.setItem("tasks", JSON.stringify(updated_tasks));
  };

  const updateReminderTime = (task, time) => {
    update_reminder_time(task.id, time);
    task = { ...task, reminder_time: time };
    let updated_tasks = tasks.map((Task) => {
      if (Task.id === task.id) {
        Task.reminder_time = time;
        return Task;
      } else {
        return Task;
      }
    });
    setTasks(updated_tasks);
    window.localStorage.setItem("tasks", JSON.stringify(updated_tasks));
  };

  const saveTask = (task, name, priority) => {
    save_task(task.id, name, priority);
    task = { ...task, name: name, priority: priority };
    let updated_tasks = tasks.map((Task) => {
      if (Task.id === task.id) {
        Task.name = name;
        Task.priority = priority;
        return Task;
      } else {
        return Task;
      }
    });
    setTasks(updated_tasks);
    window.localStorage.setItem("tasks", JSON.stringify(updated_tasks));
  };

  let form = (
    <div className="task-form">
      <div className="task-input">
        <input
          type="text"
          className="inp-task-name"
          placeholder="write a new task"
          onChange={onNameChange}
          onKeyUp={enter_add_task}
        />
        <div className="actions">
          <p className="add" onClick={addTask}>
            Add
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="list">
        {hideForm ? "" : form}
        {tasks.map((listItem, index) => {
          if (listItem.completed === displayCompleted) {
            return (
              <ListItem
                listItem={listItem}
                key={index}
                delete_task={deleteTask}
                complete_task={completeTask}
                updatePriority={updatePriority}
                updateDueDate={updateTaskDueDate}
                updateReminderTime={updateReminderTime}
                saveTask={saveTask}
              />
            );
          }
        })}
      </div>
    </>
  );
};
export default List;
