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

  const removeFromFavorites = (episode) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const showId = episode.showId;

    if (existingFavorites[showId]) {
      existingFavorites[showId] = existingFavorites[showId].filter(fav => fav.title !== episode.title);
      if (existingFavorites[showId].length === 0) {
        delete existingFavorites[showId];
      }
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      setFavorites(existingFavorites);
      alert(`${episode.title} has been removed from your favorites!`);
    }
  };

  const displayedFavorites = getFilteredAndSortedFavorites();

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Favorites</h1>
      <div className="favorites-list">
        {displayedFavorites.map((episode, index) => (
          <div
            key={index}
            className="episode-card"
            onClick={() => {
              navigate(`/SeasonDetail/${episode.episode}`, { 
                state: { 
                  season: { 
                    id: episode.seasonId, 
                    title: episode.seasonTitle, 
                    image: episode.seasonImage, 
                    description: episode.seasonDescription, 
                    episodes: episode.seasonEpisodes 
                  }, 
                  showId: episode.showId 
                } 
              });
            }}
          >
            <img src={episode.seasonImage} alt={episode.seasonTitle} className="episode-image" />
            <div className="episode-content">
              <h2 className="episode-title">{episode.title}</h2>
              <p className="episode-season">{episode.seasonTitle}</p>
              <audio controls className='audio'>
                <source src={episode.file} type="audio/mpeg" />
              </audio>
              <button onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(episode);
              }} className="remove-button">
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
