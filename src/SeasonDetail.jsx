import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

export default function SeasonDetail() {
  const location = useLocation();
  const { season, showId } = location.state; // Ensure `showId` is passed in the state
  const navigate = useNavigate();

  const addToFavorites = (episode) => {
    const episodeWithSeasonInfo = { ...episode, seasonId: season.id, seasonTitle: season.title, seasonImage: season.image };
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    
    if (!existingFavorites[showId]) {
      existingFavorites[showId] = [];
    }
    
    const isAlreadyFavorite = existingFavorites[showId].some(fav => fav.title === episode.title);

    if (!isAlreadyFavorite) {
      existingFavorites[showId].push(episodeWithSeasonInfo);
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      alert(`${episode.title} has been added to your favorites!`);
    } else {
      alert(`${episode.title} is already in your favorites!`);
    }
  };

  const removeFromFavorites = (episode) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};

    if (existingFavorites[showId]) {
      existingFavorites[showId] = existingFavorites[showId].filter(fav => fav.title !== episode.title);
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      alert(`${episode.title} has been removed from your favorites!`);
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; <span>Back to Show Detail</span>
      </button>
      <div className="header">
        <img src={season.image} alt={season.title} />
        <div>
          <h1>{season.title}</h1>
        </div>
      </div>
      <div className="episodes">
        {season.episodes.map((episode, index) => (
          <div key={index} className="episode">
            <p className="episode-title"> Episode:
              {index + 1}. {episode.title}
              <button onClick={() => addToFavorites(episode)} className="favorites-button">
                Add to Favorites
              </button>
              <button onClick={() => removeFromFavorites(episode)} className="remove-button">
                Remove from Favorites
              </button>
            </p>
            <p className="episode-description">{episode.description}</p>
            <audio controls>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}
