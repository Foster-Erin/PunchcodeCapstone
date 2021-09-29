function SearchBar({ setSearchInput, searchInput }) {
  return (
    <div className='searchBox'>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        name='description'
        type='text'
        placeholder='Job, Location'
      />
      <button id='searchBtn' type='submit'>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
