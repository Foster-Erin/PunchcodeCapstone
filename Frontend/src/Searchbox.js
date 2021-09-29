function Searchbox(setSearchInput, searchInput) {
  return (
    <>
      <div className='searchBox'>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          name='description'
          type='text'
          placeholder='Job, Location'
        />
      </div>
      <div className='searchBox'>
        <button id='searchBtn' type='submit'>
          SEARCH
        </button>
      </div>
    </>
  );
}

export default Searchbox;
