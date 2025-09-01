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
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false); 
  const token = localStorage.getItem("token");

  const location = useLocation();
  const viewNote = (location.state as { note?: Note; readOnly?: boolean }) || {};

  useEffect(() => {
    if (viewNote.note) {
      setNewNote(viewNote.note.message);
      setIsReadOnly(viewNote.readOnly || false); 
    }
  }, [viewNote]);

useEffect(() => {
  const fetchNotes = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(
        `https://notes-backend-63wv.onrender.com/api/notes/get?userId=${userId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Normalize notes to always be an array
      const notesData = res.data.get || res.data.notes || res.data.note || res.data;
      const normalizedNotes = Array.isArray(notesData) ? notesData : [notesData];

      // Filter out the message object if backend returned a message only
      const filteredNotes = normalizedNotes.filter(n => n._id && n.message);

      setNotes(
        filteredNotes.map((n: any) => ({
          _id: n._id,
          message: n.message,
        }))
      );
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  if (token) fetchNotes();
}, [token]);

  const handleAddOrEditNote = async () => {
    if (!newNote.trim()) return;

    try {
      if (editingNoteId) {
        const res = await axios.put(
          `https://notes-backend-63wv.onrender.com/api/notes/edit/${editingNoteId}`,
          { message: newNote },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedNote = res.data.note || res.data.data;
        setNotes((prev) =>
          prev.map((note) =>
            note._id === editingNoteId
              ? { _id: updatedNote._id, message: updatedNote.message }
              : note
          )
        );

        setEditingNoteId(null);
        setNewNote("");
      } else {
        const res = await axios.post(
          "https://notes-backend-63wv.onrender.com/api/notes/create",
          { message: newNote },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const createdNote = res.data.note || res.data.data || res.data;
        setNotes((prev) => [...prev, { _id: createdNote._id, message: createdNote.message }]);
        setNewNote("");
      }
    } catch (error) {
      console.error(" Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`https://notes-backend-63wv.onrender.com/api/notes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error(" Error deleting note:", error);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNoteId(note._id);
    setNewNote(note.message);
    setIsReadOnly(false); 
  };

  return (
    <>
      <Navbar />
      <div className="notes-container">
        <h2> My Notes</h2>

        <div className="note-input">
          <textarea
            placeholder="Write a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={1}
            readOnly={isReadOnly}
            className={isReadOnly ? "readonly-textarea" : ""}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />

          {isReadOnly ? (
            <button className="edit-btn" onClick={() => setIsReadOnly(false)}>
              <Edit /> Edit
            </button>
          ) : (
            <button onClick={handleAddOrEditNote}>
              {editingNoteId ? "💾 Save Note" : "➕ Add Note"}
            </button>
          )}
        </div>

        {!isReadOnly && (
          <div className="notes-list">
            {notes.length === 0 ? (
              <p className="empty-msg">No notes yet. Create one!</p>
            ) : (
              notes.map((note) => (
                <div key={note._id} className="note-card">
                  <span className="notes-message">{note.message}</span>
                  <div className="note-actions">
                    <button className="edit-btn" onClick={() => handleEditNote(note)}>
                      <Edit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteNote(note._id)}>
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
