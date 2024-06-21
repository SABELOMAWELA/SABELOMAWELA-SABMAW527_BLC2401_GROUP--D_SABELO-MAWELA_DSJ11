import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import genresmapping from "./genresmapping";
import './App.css';


export default function ShowList({ searchTerm, sortOrder }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState(sortOrder || "A-Z");
  const [dateSortOrder, setDateSortOrder] = useState(""); // New state for date sort order
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

    if (selectedGenre) {
      filteredShows = filteredShows.filter(show =>
        show.genres.includes(parseInt(selectedGenre))
      );
    }

    if (sortOrder === 'A-Z') {
      filteredShows.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      filteredShows.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (dateSortOrder === 'newest') {
      filteredShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (dateSortOrder === 'oldest') {
      filteredShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    }

    return filteredShows;
  };

  const displayedShows = getFilteredAndSortedShows();

  if (loading) return <div>Loading...</div>;

  const handleClick = (show) => {
    navigate('/ShowDetail', { state: { show } });
  };

  return (
    <div className="show-list-container">
      <div className='header'>
        <h1 className='title'>Dive into the stories that move us.</h1>
        <div className='dropdowns'>
          <select 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)} 
            className='genre-dropdown'
          >
            <option value="">All Genres</option>
            {Object.entries(genresmapping).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <select 
            value={dateSortOrder} 
            onChange={(e) => setDateSortOrder(e.target.value)} 
            className='date-sort-dropdown'
          >
            <option value="">Sort by Date</option>
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>
      <ul className='cards-grid'>
        {displayedShows.map((show, index) => (
          <li key={index} className='card' onClick={() => handleClick(show)}>
            <img className='card-image' src={show.image} alt={show.title} />
            <div className='card-content'>
              <h2 className='card-heading'>{show.title}</h2>
              <p className='card-info'>Seasons: {show.seasons}</p>
              <p className='card-info'>Genre: {show.genres.map(genre => genresmapping[genre]).join(', ')}</p>
              <p className='card-info'>Updated: {new Date(show.updated).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
