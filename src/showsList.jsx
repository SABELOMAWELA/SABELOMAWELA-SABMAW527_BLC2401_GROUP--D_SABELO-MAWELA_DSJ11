import React, { useState, useEffect } from 'react';

export default function ShowList() {
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(response => response.json())
      .then(data => {
        const images = data.map(item => item.image);
        const titles = data.map(item => item.title);
        setImages(images);
        setTitles(titles);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div >
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

