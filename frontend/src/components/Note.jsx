import React from "react";
import "../styles/Note.css";

// Component to display an individual note with a delete option
function Note({ note, onDelete }) {
  // Format the note's creation date
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p> {/* Display note title */}
      <p className="note-content">{note.content}</p>{" "}
      {/* Display note content */}
      <p className="note-date">{formattedDate}</p>{" "}
      {/* Display formatted date */}
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete {/* Delete button triggers the onDelete function with note id */}
      </button>
    </div>
  );
}

export default Note;
