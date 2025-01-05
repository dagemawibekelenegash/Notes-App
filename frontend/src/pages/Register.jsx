import Form from "../components/Form"; // Importing the Form component

function Register() {
  // Rendering the Form component with the appropriate route and method for registration
  return <Form route="/api/user/register/" method="register" />;
}

export default Register; // Exporting Register component for use in other parts of the app
