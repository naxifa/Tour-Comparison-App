

import React, { useState, useEffect } from "react";
import "./Gallery.css"; // Import CSS for styling

function Gallery() {
  // State for storing fetched tours
  const [tours, setTours] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error message
  const [error, setError] = useState("");

  // Fetch tours whenever the component mounts
  useEffect(() => {
    fetchTours();
  }, []); // No dependencies to ensure it only runs once

  // Function to fetch tours
  const fetchTours = () => {
    setLoading(true); // Show loading state
    fetch("https://www.course-api.com/react-tours-project")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tours");
        }
        return response.json();
      })
      .then((data) => {
        setTours(data); // Store fetched tours in state
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        setError(err.message); // Capture error message
      })
      .finally(() => {
        setLoading(false); // Remove loading state
      });
  };

  // Function to remove a tour by ID
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // Function to toggle "Read More / Show Less"
  const toggleReadMore = (id) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };



  // Render UI
  return (
    <div>
      {loading && <h2>Loading...</h2>} {/* Show loading state */}
      {error && <h2>Error: {error}</h2>} {/* Show error state */}
      {!loading && !error && tours.length === 0 && (
        <h2>No tours available</h2> /* Handle empty state */
      )}
      <div className="gallery">
        {/* Map through tours to display them */}
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <img src={tour.image} alt={tour.name} />
            <div className="tour-info">
              <h3>{tour.name}</h3>
              <p>${tour.price}</p>
              <p>
                {tour.showMore
                  ? tour.info
                  : `${tour.info.substring(0, 100)}...`}
                <button onClick={() => toggleReadMore(tour.id)}>
                  {tour.showMore ? "Show Less" : "Read More"}
                </button>
              </p>
              <button onClick={() => removeTour(tour.id)}>Not Interested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;