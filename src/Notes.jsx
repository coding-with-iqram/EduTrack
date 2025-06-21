import React, { useState } from "react";
import { FaTrash, FaEdit, FaEllipsisV } from "react-icons/fa"; // FontAwesome আইকন
import './App.css';


function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Math Formulas", content: "Area of circle = πr²" },
    { id: 2, title: "Physics Laws", content: "Newton's First Law of Motion" },
  ]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      if (editingId) {
        setNotes(notes.map(note => (
          note.id === editingId ? { ...note, ...newNote } : note
        )));
        setEditingId(null);
      } else {
        setNotes([...notes, { ...newNote, id: Date.now() }]);
      }
      setNewNote({ title: "", content: "" });
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (note) => {
    setNewNote({ title: note.title, content: note.content });
    setEditingId(note.id);
    setMenuOpenId(null); // মেনু বন্ধ করে দিচ্ছে
  };

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  return (
    <div className="notes-container">
      <h2>My Notes</h2>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleAddNote}>
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card" style={{ position: "relative" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div className="menu-icon" onClick={() => toggleMenu(note.id)}>
              <FaEllipsisV />
            </div>

            {menuOpenId === note.id && (
              <div className="dropdown-menu">
                <button onClick={() => handleEditNote(note)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDeleteNote(note.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;