import { createContext, useState } from "react";

export const taskContext = createContext();
export const TaskConsumer = taskContext.Consumer;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  return (
    <taskContext.Provider
      value={{
        tasks: tasks,
        setTasks: setTasks,
        completedTasks: completedTasks,
        setCompletedTasks: setCompletedTasks,
        notes: notes,
        setNotes: setNotes,
        currentNote: currentNote,
        setCurrentNote: setCurrentNote,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};
