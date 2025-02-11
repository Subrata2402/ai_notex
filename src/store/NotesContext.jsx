import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(notes);
    setLoading(false);
  };

  const addNote = (note) => {
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    getNotes();
  };

  const deleteNote = (noteId) => {
    const filteredNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    getNotes();
  };

  const updateNote = (updatedNote, noteId) => {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    notes[noteIndex] = updatedNote;
    localStorage.setItem('notes', JSON.stringify(notes));
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NotesContext.Provider value={{
      notes,
      getNotes,
      addNote,
      deleteNote,
      updateNote
    }}>
      {loading ? <Loader /> : children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};

export default NotesProvider;