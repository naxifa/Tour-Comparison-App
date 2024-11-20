

//  Gallery.jsx (Tour List Component)


import React, { useState, useEffect } from "react";
import "./Gallery.css"; 

// Gallery component
function Gallery() {
  const [tours, setTours] = useState([]); // State for storing fetched tours
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch tours from the API
  const fetchTours = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch("https://course-api.com/react-tours-project"); // Fetch data from API
      if (!response.ok) throw new Error("Failed to fetch tours"); // Handle API errors
      const data = await response.json(); // Parse response JSON
      setTours(data); // Update tours state with fetched data
    } catch (err) {
      setError(err.message); // Set error message if fetch fails
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Remove a tour from the list
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id)); // Filter out the tour with the given ID
  };

  // Toggle detailed description for a tour
  const toggleReadMore = (id) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  // Show loading message while fetching data
  if (loading) return <h2>Loading...</h2>;

  // Show error message if fetch fails
  if (error) return <h2>Error: {error}</h2>;

  // Render the tours
  return (
    <div className="gallery">
      {tours.map(({ id, name, price, info, image, showMore }) => (
        <div key={id} className="tour-card">
          {/* Tour image */}
          <img src={image} alt={name} />
          <div className="tour-info">
            {/* Tour name and price */}
            <h3>{name}</h3>
            <p>${price}</p>
            {/* Tour description with "Read More / Show Less" toggle */}
            <p>
              {showMore ? info : `${info.substring(0, 100)}...`}
              <button onClick={() => toggleReadMore(id)}>
                {showMore ? "Show Less" : "Read More"}
              </button>
            </p>
            {/* "Not Interested" button to remove tour */}
            <button onClick={() => removeTour(id)}>Not Interested</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
