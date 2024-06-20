import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowList from './showsList';
import Navbar from './navbar';
import Home from './Home';
import ShowDetail from './ShowDetail';
import SeasonDetail from './SeasonDetail';
import Favorites from './favorite';
import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null);

  return (
    <BrowserRouter>
      <Navbar setSearchTerm={setSearchTerm} setSortOrder={setSortOrder} />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/shows" element={<ShowList searchTerm={searchTerm} sortOrder={sortOrder} />} />
        <Route path="/ShowDetail" element={<ShowDetail />} />
        <Route path="/SeasonDetail/:id" element={<SeasonDetail />} />
        <Route path="/favorites" element={<Favorites searchTerm={searchTerm} sortOrder={sortOrder} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
