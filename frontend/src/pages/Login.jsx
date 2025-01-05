import Form from "../components/Form"; // Importing the Form component

function Login() {
  return <Form route="/api/token/" method="login" />; // Rendering the Form component with the login route and method
}

export default Login; // Exporting the Login component
