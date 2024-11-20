
// App.jsx (Root Component)

import React from "react";
import Gallery from "./components/Gallery"; // Import the Gallery component
import "./App.css"; // Import styles for the app

// Main App component
function App() {
  return (
    <div className="App">
      {/* App title */}
      <h1>Tour Comparison App</h1>
      {/* Render the Gallery component */}
      <Gallery />
    </div>
  );
}

export default App;
