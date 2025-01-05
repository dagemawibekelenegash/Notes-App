import { Navigate } from "react-router-dom"; // Importing Navigate to redirect users after logout

const Logout = () => {
  localStorage.clear(); // Clearing all data from localStorage (removes stored tokens)
  return <Navigate to="/login" />; // Redirecting user to the login page after logout
};

export default Logout; // Exporting the Logout component
