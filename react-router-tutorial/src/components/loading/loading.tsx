import "./loading.css"; // Import the CSS file to style the loading spinner

const Loading = () => {
  return (
    <>
      <h1>Loading ...</h1>
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </>
  );
};

export default Loading;
