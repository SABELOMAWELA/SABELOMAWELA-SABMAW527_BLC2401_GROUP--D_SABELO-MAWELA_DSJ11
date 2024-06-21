import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

export default function Favorites({ searchTerm, sortOrder }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : {});
  }, []);

  const getFilteredAndSortedFavorites = () => {
    let allFavorites = Object.values(favorites).flat();

    if (searchTerm) {
      allFavorites = allFavorites.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'A-Z') {
      allFavorites.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      allFavorites.sort((a, b) => b.title.localeCompare(a.title));
    }

    return allFavorites;
  };

  const displayedFavorites = getFilteredAndSortedFavorites();

  const handleEpisodeClick = (episode) => {
    const seasonEpisodes = favorites[episode.showId].filter(fav => fav.seasonId === episode.seasonId);

    navigate(`/SeasonDetail/${episode.episode}`, { 
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
    <div className="favorites-container">
      <h1 className="favorites-title">Favorites</h1>
      <div className="favorites-list">
        {displayedFavorites.map((episode, index) => (
          <div
            key={index}
            className="episode-card"
            onClick={() => handleEpisodeClick(episode)}
          >
            <img src={episode.seasonImage} alt={episode.seasonTitle} className="episode-image" />
            <div className="episode-content">
              <h2 className="episode-title">{episode.title}</h2>
              <p className="episode-season">{episode.seasonTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
