import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  // State to store notes, content, and title
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Navigate hook to handle navigation actions
  const navigate = useNavigate();

  // Function to handle user logout and navigate to the logout page
  const handleLogout = () => {
    navigate("/logout");
  };

  // useEffect hook to fetch notes when the component mounts
  useEffect(() => {
    getNotes();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Function to fetch all notes from the backend
  const getNotes = () => {
    api
      .get("/api/notes/") // API call to get notes
      .then((res) => res.data) // Extracting data from the response
      .then((data) => {
        setNotes(data); // Updating state with fetched notes
      })
      .catch((err) => alert(err)); // Handling errors
  };

  // Function to handle note deletion
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`) // API call to delete note by ID
      .then((res) => {
        if (res.status === 204) alert("Note deleted!"); // Success message
        else alert("Failed to delete note."); // Failure message
        getNotes(); // Re-fetch notes after deletion
      })
      .catch((error) => alert(error)); // Handling errors
  };

  // Function to create a new note
  const createNote = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    api
      .post("/api/notes/", { content, title }) // API call to create a new note
      .then((res) => {
        if (res.status === 201) {
          alert("Note created!"); // Success message
          setTitle(""); // Clear title input
          setContent(""); // Clear content input
        } else {
          alert("Failed to make note."); // Failure message
        }
        getNotes(); // Re-fetch notes after creation
      })
      .catch((err) => alert(err)); // Handling errors
  };

  return (
    <div>
      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <h2 className="note-header">Create a Note</h2>

      {/* Form to create a new note */}
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)} // Updating title state
          value={title}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)} // Updating content state
        ></textarea>

        <input type="submit" value="Submit" />
      </form>

      <div className="notes-section">
        <h2 className="note-header">Notes</h2>

        {/* Mapping over the notes to display them */}
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
