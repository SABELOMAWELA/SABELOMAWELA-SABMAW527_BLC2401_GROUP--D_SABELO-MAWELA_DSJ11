import React from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import './App.css';

export default function SeasonDetail() {
  const location = useLocation();
  const { season } = location.state;
  const navigate = useNavigate();

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
            <p className="episode-title">{index + 1}.{episode.title}</p>
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