import React, { useEffect, useState } from "react";
import "../styles/home/Dashboard.css";
import { FaTrash as FaTrashIcon } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Trash = FaTrashIcon as unknown as React.FC;

interface User {
  name: string;
  email: string;
  dob: string;
}

interface Note {
  _id: string;
  message: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndNotes = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("No userId or token found in localStorage");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const profileRes = await axios.get(
          `http://localhost:5000/api/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(profileRes.data.user);

        const notesRes = await axios.get("http://localhost:5000/api/notes/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(notesRes.data.get || []);
      } catch (error) {
        console.error("Error fetching profile or notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndNotes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleViewNote = (note: Note) => {
    navigate("/notes", { state: { note, readOnly: true } });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <span className="spinner"></span>
          <h2>Dashboard</h2>
        </div>
        <button onClick={handleLogout} className="signout-link">
          Sign Out
        </button>
      </header>

      <div className="user-card">
        {loading ? (
          <p>Loading profile...</p>
        ) : user ? (
          <>
            <h3>Welcome, {user.name}!</h3>
            <p>Email: {user.email}</p>
            <p>Date of Birth: {user.dob}</p>
          </>
        ) : (
          <p>Failed to load user data</p>
        )}
      </div>

      <Link to="/notes" className="create-btn">
        Create Note
      </Link>

      <div className="notes-section">
        <h4>Notes</h4>
        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <span className="notes-message">{note.message}</span>
              <button
                className="delete-btn"
                onClick={() => handleViewNote(note)}
              >
                View
              </button>
            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
