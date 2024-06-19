import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

export default function SeasonDetail() {
  const location = useLocation();
  const { season } = location.state;
  const navigate = useNavigate();

  const addToFavorites = (episode) => {
    const episodeWithSeasonInfo = { ...episode, seasonTitle: season.title, seasonImage: season.image };
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = existingFavorites.some(fav => fav.title === episode.title);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...existingFavorites, episodeWithSeasonInfo];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert(`${episode.title} has been added to your favorites!`);
    } else {
      alert(`${episode.title} is already in your favorites!`);
    }
  };

  const removeFromFavorites = (episode) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = existingFavorites.filter(fav => fav.title !== episode.title);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert(`${episode.title} has been removed from your favorites!`);
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
            <p className="episode-title">
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
