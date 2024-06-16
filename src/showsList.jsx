import React, { useState, useEffect } from 'react';

export default function ShowList() {
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(response => response.json())
      .then(data => {
        const images = data.map(item => item.image);
        const titles = data.map(item => item.title);
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
    <div >
         <div className='root'>
          <h1 className='SHOWS'>Dive into the stories that move us. </h1>
            </div> 
      <ul className='cards-grid'>
        {images.map((image, index) => (
          <dd key={index}className='card'>
            <img className='card-image' src={image} alt={titles[index]} />
            <h2 className='card-heading'>{titles[index]}</h2>
          </dd>
        ))}
      </ul>
    </div>
  );
}


