import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function ShowList() {
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
        {shows.map((show, index) => (
          <li key={index} className='card'>
            <img className='card-image' src={show.image} alt={show.title} onClick={() => handleClick(show)}/>
            <h2 className='card-heading'>{show.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}