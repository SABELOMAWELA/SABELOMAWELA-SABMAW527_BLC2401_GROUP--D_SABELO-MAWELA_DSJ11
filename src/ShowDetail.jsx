import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

export default function ShowDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [show.id]);

  const seasons = (shows?.seasons && Object.values(shows.seasons)) || [];

  if (loading) return <div>Loading...</div>;

  const handleSeasonClick = (season) => {
    navigate(`/SeasonDetail/${season.id}`, { state: { season } });
  };

  return (
    <div className="container">
      <div className="header">
        <img src={show.image} alt={show.title} />
        <div>
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <strong>
            <p>Seasons:{show.seasons}</p>
          </strong>
          <div className="genres">
            <strong>Genres:</strong>
            {show.genres.map((genre, index) => (
              <div key={index} className="genre">
                {genre}
              </div>
            ))}
          </div>
          <p>Updated: {new Date(show.updated).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="seasons">
        {seasons.map((season, index) => (
          <div
            key={index}
            className="season-card"
            onClick={() => handleSeasonClick(season)}
          >
            <img src={season.image} alt={season.title} />
            <h2>{season.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
