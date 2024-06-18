import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

export default function ShowDetail() {
  const location = useLocation();
  const { show } = location.state;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setShows(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const seasons = shows?.seasons && Object.values(shows.seasons) || []
 console.log(seasons[0])

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} />
      <p>{show.description}</p>
      <p>Seasons: {show.seasons}</p>
      <p>Genres: {show.genres}</p>
      <p>Updated: {new Date(show.updated).toLocaleDateString()}</p>
      {seasons.map(season => {return (
        <>
        <p>{season.title}</p>
        <img src={season.image} alt={show.title} />
        <div>
        {season.episodes.map(episode => <p>{episode.title}</p>)}
        {season.episodes.map(episode => <p>{episode.description}</p>)}
        {season.episodes.map(episode => <p>{episode.file}</p>)}
        </div>
        
        </>
        )})}
      {/* {seasons[0]} */}
      
    </div>
  );
}
