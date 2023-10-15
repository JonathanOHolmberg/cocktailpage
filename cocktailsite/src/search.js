import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
      className='px-4 rounded border border-slate-50 mr-4'
        type="text"
        placeholder="Enter cocktail name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="px-8 rounded-bl-2xl border border-slate-50 text-slate-50 mr-4" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
