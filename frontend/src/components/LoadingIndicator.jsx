import "../styles/LoadingIndicator.css";

// Component for displaying a loading spinner
const LoadingIndicator = () => {
  return (
    <div className="loading-container">
      {" "}
      {/* Wrapper for the loading indicator */}
      <div className="loader"></div> {/* Spinner element */}
    </div>
  );
};

export default LoadingIndicator;
