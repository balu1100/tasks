import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../firebase.config";

const fetch_notes = async (id) => {
  const notes = [];
  let result = await getDocs(collection(database, "notes"));

  result.forEach((note) => {
    if (note.data().user == id) {
      let Note = { ...note.data(), id: note.id };
      notes.push(Note);
    }
  });
  return notes;
};

const add_note = async (note) => {
  let doc_ref = await addDoc(collection(database, "notes"), note);
  return doc_ref;
};

const delete_note = async (id) => {
  const doc_ref = doc(database, "notes", id);
  await deleteDoc(doc_ref);
};

const save_note = async (id, title, body) => {
  const doc_ref = doc(database, "notes", id);
  await updateDoc(doc_ref, {
    title: title,
    body: body,
  });
};

export { fetch_notes, delete_note, add_note, save_note };
