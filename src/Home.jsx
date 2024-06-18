import React, { useState, useEffect } from 'react';
import SwiperComponent from "./swiper";
// import ShowList from "./showsList";

function Home() {
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(response => response.json())
      .then(data => {
        const selectedIds = ["9177", "8256", "9620", "10758", "9263", "9041"];
        const filteredData = data.filter(podcast => selectedIds.includes(podcast.id));
        const images = filteredData.map(item => item.image);
        const titles = filteredData.map(item => item.title);
        setImages(images);
        setTitles(titles);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home">
      <div className='intro-home'>
      <h1 className='home-intro'>Welcome to Podcast!</h1>
      <p className='shortstory'>We bring you some top-tier shows</p>
      </div>
      <SwiperComponent images={images} titles={titles} />
    </div>
  );
}

export default Home;
