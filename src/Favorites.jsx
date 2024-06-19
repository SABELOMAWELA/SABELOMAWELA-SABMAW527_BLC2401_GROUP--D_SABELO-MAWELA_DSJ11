import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const navigate = useNavigate();

  const handleEpisodeClick = (episode) => {
    navigate(`/SeasonDetail/${episode.seasonId}`, { 
      state: { 
        season: { 
          id: episode.seasonId, 
          title: episode.seasonTitle, 
          image: episode.seasonImage, 
          description: episode.seasonDescription,  // Add description to navigate state
          episodes: favorites.filter(fav => fav.seasonId === episode.seasonId) 
        } 
      } 
    });
  };

  return (
    <div className="container">
      <h1>Favorites</h1>
      <div className="favorites-list">
        {favorites.map((episode, index) => (
          <div
            key={index}
            className="episode-card"
            onClick={() => handleEpisodeClick(episode)}
          >
            <img src={episode.seasonImage} alt={episode.seasonTitle} />
            <h2>{episode.title}</h2>
            <p>{episode.seasonTitle}</p>
            <p>{episode.seasonDescription}</p> {/* Display season description */}
          </div>

        ))}
      </div>
    </div>
  );
}
