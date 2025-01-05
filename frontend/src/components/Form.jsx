import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  // State variables for form inputs and loading state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register"; // Determine form type

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        // Save tokens to local storage on successful login
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/"); // Redirect to home page
      } else {
        navigate("/login"); // Redirect to login after registration
      }
    } catch (error) {
      alert(error); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />} {/* Show loading indicator */}
      <button className="form-button" type="submit">
        {name}
      </button>
      {method === "login" ? (
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      )}
    </form>
  );
}

export default Form;
