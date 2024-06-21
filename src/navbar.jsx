import React from 'react';

const Navbar = ({ setSearchTerm, setSortOrder }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <nav className="nav">
      <a href="/Home" className="site-title">Podcast</a>
      <ul>
        <li>
          <a href="/shows">Shows</a>
        </li>
        <li>
          <a href="/Home">Home</a>
        </li>
        <li>
          <a href="/Favorites">Favorite</a>
        </li>
      </ul>
      <div className="nav-actions">
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button onClick={() => handleSort('A-Z')} className="sort-button">Sort A-Z</button>
        <button onClick={() => handleSort('Z-A')} className="sort-button">Sort Z-A</button>
      </div>
    </nav>
  );
};

export default Navbar;
