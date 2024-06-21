import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import genresmapping from "./genresmapping";

export default function ShowDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState("All");

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
  console.log(seasons);

  if (loading) return <div>Loading...</div>;

  const handleSeasonSelect = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; <span>Back to Show Detail</span>
      </button>
      <div className="header">
        <img src={show.image} alt={show.title} />
        <div>
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <strong>
            <p>Seasons: {show.seasons}</p>
          </strong>
          <div className="genres">
            {show.genres.map((genre, index) => (
              <div key={index} className="genre">
                <strong>Genre: {genresmapping[genre]}</strong>
              </div>
            ))}
          </div>
          <strong>
            <p>Updated: {new Date(show.updated).toLocaleDateString()}</p>
          </strong>
        </div>
      </div>
      <div className="seasons-dropdown">
        <label htmlFor="season-select">Select Season: </label>
        <select id="season-select" onChange={handleSeasonSelect} defaultValue="All">
          <option value="All">All</option>
          {seasons.map((season, index) => (
            <option key={index} value={season.season}>
              {season.season}
            </option>
          ))}
        </select>
      </div> 
      <div className="season-details">
        {selectedSeason === "All"
          ? seasons.map((season, index) => (
              <div
                key={index}
                className="season-card"
                onClick={() =>
                  navigate(`/SeasonDetail/${season.season}`, { state: { season } })
                }
              >
                <img src={season.image} alt={season.title} />
                <h2>{season.title}</h2>
              </div>
            ))
          : seasons
              .filter((season) => season.season.toString() === selectedSeason)
              .map((season, index) => (
                <div
                  key={index}
                  className="season-card"
                  onClick={() =>
                    navigate(`/SeasonDetail/${season.season}`, { state: { season } })
                  }
                >
                  <img src={season.image} alt={season.title} />
                  <h2>{season.title}</h2>
                </div>
              ))}
      </div>
    </div>
  );
}
