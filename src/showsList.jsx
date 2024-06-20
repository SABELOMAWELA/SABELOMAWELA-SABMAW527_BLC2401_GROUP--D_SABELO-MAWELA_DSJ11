import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import genresmapping from "./genresmapping";

export default function ShowList({ searchTerm, sortOrder }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const getFilteredAndSortedShows = () => {
    let filteredShows = shows.filter(show =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'A-Z') {
      filteredShows.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      filteredShows.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filteredShows;
  };

  const displayedShows = getFilteredAndSortedShows();

  if (loading) return <div>Loading...</div>;

  const handleClick = (show) => {
    navigate('/ShowDetail', { state: { show } });
  };

  return (
    <div>
      <div className='root'>
        <h1 className='SHOWS'>Dive into the stories that move us.</h1>
      </div>
      <ul className='cards-grid'>
        {displayedShows.map((show, index) => (
          <li key={index} className='card'>
            <img className='card-image' src={show.image} alt={show.title} onClick={() => handleClick(show)} />
            <h2 className='card-heading'>{show.title}</h2>
            <p className='card-info'>Seasons: {show.seasons}</p>
            <p className='card-info'>Genre: {show.genres.map(genre => genresmapping[genre]).join(', ')}</p>
            <p className='card-info'>Updated: {new Date(show.updated).toLocaleDateString()}</p>
          </li>

        ))}
      </ul>
    </div>
  );
}
