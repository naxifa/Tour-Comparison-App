
// App.jsx (Root Component)

import React from "react";
import Gallery from "./components/Gallery"; // Import the Gallery component
import "./App.css"; // Import styles for the app

// Main App component
function App() {
  return (
    <div className="App">

      <h1>Tour Comparison App</h1>
      <Gallery />

    </div>
  );
}

export default App;
