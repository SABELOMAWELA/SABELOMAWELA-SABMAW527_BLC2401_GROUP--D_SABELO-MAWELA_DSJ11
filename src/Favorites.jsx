import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });
  const navigate = useNavigate();

  const handleEpisodeClick = (episode) => {
    const seasonEpisodes = favorites[episode.showId].filter(fav => fav.seasonId === episode.seasonId);

    navigate(`/SeasonDetail/${episode.seasonId}`, { 
      state: { 
        season: { 
          id: episode.seasonId, 
          title: episode.seasonTitle, 
          image: episode.seasonImage, 
          description: episode.seasonDescription, 
          episodes: seasonEpisodes
        }, 
        showId: episode.showId 
      }
    });
  };

  return (
    <div className="container">
      <h1>Favorites</h1>
      <div className="favorites-list">
        {Object.keys(favorites).map((showId) =>
          favorites[showId].map((episode, index) => (
            <div
              key={index}
              className="episode-card"
              onClick={() => handleEpisodeClick(episode)}
            >
              <img src={episode.seasonImage} alt={episode.seasonTitle} />
              <h2>{episode.title}</h2>
              <p>{episode.seasonTitle}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
