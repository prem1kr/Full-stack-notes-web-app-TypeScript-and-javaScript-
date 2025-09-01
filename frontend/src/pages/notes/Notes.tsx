import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/notes/Notes.css";
import { FaTrash as FaTrashIcon } from "react-icons/fa";
import { FaEdit as FaEditIcon } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const Trash = FaTrashIcon as unknown as React.FC;
const Edit = FaEditIcon as unknown as React.FC;

interface Note {
  _id: string;
  message: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `https://notes-backend-63wv.onrender.com/api/notes/get?userId=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const normalizedNotes = (res.data.get || res.data.notes || res.data.data || []).map(
          (n: any) => ({
            _id: n._id,
            message: n.message,
          })
        );

        setNotes(normalizedNotes);
      } catch (error) {
        console.error("❌ Error fetching notes:", error);
      }
    };

    if (token && userId) fetchNotes();
  }, [token, userId]);

  // Add or Edit Note
  const handleAddOrEditNote = async () => {
    try {
      if (editId) {
        // Update existing note
        await axios.put(
          `https://notes-backend-63wv.onrender.com/api/notes/edit/${editId}`,
          { message: newNote },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setNotes((prev) =>
          prev.map((note) =>
            note._id === editId ? { ...note, message: newNote } : note
          )
        );
        setEditId(null);
      } else {
        // Create new note with userId
        const res = await axios.post(
          "https://notes-backend-63wv.onrender.com/api/notes/create",
          { message: newNote, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const createdNote = res.data.note || res.data.data || res.data;
        setNotes((prev) => [
          ...prev,
          { _id: createdNote._id, message: createdNote.message },
        ]);
      }

      setNewNote("");
    } catch (error) {
      console.error("❌ Error saving note:", error);
    }
  };

  // Delete Note
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://notes-backend-63wv.onrender.com/api/notes/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("❌ Error deleting note:", error);
    }
  };

  return (
    <div>
      <h2>My Notes</h2>

      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note"
        />
        <button onClick={handleAddOrEditNote}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {note.message}
            <button onClick={() => { setNewNote(note.message); setEditId(note._id); }}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
