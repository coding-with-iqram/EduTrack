import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEllipsisV } from "react-icons/fa";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  console.log(newNote)
  console.log(notes, 'notes')

  // const API_BASE = "http://localhost:5000";
  const API_BASE = "https://edu-track-backend-jade.vercel.app";


  const fetchNotes = () => {
    fetch(`${API_BASE}/notes`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to fetch notes:", err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    const { title, description } = newNote;
    if (!title || !description) return;

    if (editingId) {
      // Update existing note
      fetch(`${API_BASE}/note/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      })
        .then(() => {
          fetchNotes();
          setEditingId(null);
          setNewNote({ title: "", description: "" });
        })
        .catch((err) => console.error("Failed to update note:", err));
    } else {
      // Create new note
      fetch(`${API_BASE}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      })
        .then(() => {
          fetchNotes();
          setNewNote({ title: "", description: "" });
        })
        .catch((err) => console.error("Failed to add note:", err));
    }
  };

  const handleDeleteNote = (id) => {
    fetch(`${API_BASE}/note/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchNotes();
      })
      .catch((err) => console.error("Failed to delete note:", err));
  };

  const handleEditNote = (note) => {
    setNewNote({ title: note.title, description: note.description });
    setEditingId(note._id);
    setMenuOpenId(null);
  };

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Notes</h2>

      <div className="bg-gray-50 p-6 rounded-xl shadow space-y-4 mb-8">
        <input
          type="text"
          placeholder="Note title"
          value={newNote.title}
          onChange={(e) =>
            setNewNote({ ...newNote, title: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          placeholder="Note description"
          value={newNote.description}
          onChange={(e) =>
            setNewNote({ ...newNote, description: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAddNote}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className={`relative p-4 rounded-xl border bg-white hover:shadow-md transition ${
              editingId === note._id ? "ring-2 ring-indigo-300" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {note.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{note.description}</p>

            <div
              className="absolute top-3 right-3 text-gray-400 hover:text-indigo-500 cursor-pointer"
              onClick={() => toggleMenu(note._id)}
            >
              <FaEllipsisV />
            </div>

            {menuOpenId === note._id && (
              <div className="absolute top-10 right-3 bg-white border rounded-md shadow-md z-10 overflow-hidden">
                <button
                  onClick={() => handleEditNote(note)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
                >
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
