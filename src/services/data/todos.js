import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { database } from "../firebase.config";

const fetch_todos = async (id) => {
  const tasks = [];
  let result = await getDocs(collection(database, "tasks"));
  // console.log(result.docs[0].user);
  result.forEach((task) => {
    if (task.data().user == id) {
      let Task = { ...task.data(), id: task.id };
      tasks.push(Task);
    }
  });
  return tasks;
};

const fetch_completed_tasks = async (id) => {
  const tasks = [];
  let q = query(
    collection(database, "tasks"),
    where("completed", "==", true),
    where("user", "==", id)
  );
  let result = await getDocs(q);
  result.forEach((task) => {
    let Task = { ...task.data(), id: task.id };
    tasks.push(Task);
  });
  return tasks;
};

const add_task = async (task) => {
  let doc_ref = await addDoc(collection(database, "tasks"), task);
  return doc_ref;
};

const delete_task = async (id) => {
  const doc_ref = doc(database, "tasks", id);
  await deleteDoc(doc_ref);
};

const complete_task = async (id, isCompleted) => {
  const doc_ref = doc(database, "tasks", id);
  await updateDoc(doc_ref, {
    completed: isCompleted,
  });
};

const set_task_priority = async (id, priority) => {
  const doc_ref = doc(database, "tasks", id);
  await updateDoc(doc_ref, {
    priority: priority,
  });
};

const update_due_date = async (id, date) => {
  const doc_ref = doc(database, "tasks", id);
  await updateDoc(doc_ref, {
    "due-date": date,
  });
};

const update_reminder_time = async (id, time) => {
  const doc_ref = doc(database, "tasks", id);
  await updateDoc(doc_ref, {
    reminder_time: time,
  });
};

const save_task = async (id, name, priority) => {
  const doc_ref = doc(database, "tasks", id);
  await updateDoc(doc_ref, {
    name: name,
    priority: priority,
  });
};

export {
  fetch_todos,
  fetch_completed_tasks,
  add_task,
  delete_task,
  complete_task,
  set_task_priority,
  update_due_date,
  update_reminder_time,
  save_task,
};
