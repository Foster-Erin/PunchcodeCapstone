import useFetchJobs from './useFetchJobs';
import React, { useState, useEffect } from 'react';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import './App.css';


function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages, searchJobs } = useFetchJobs(
    params,
    page
  );
  const [searchValue, setSearchValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (typeof searchJobs === 'function') {
      searchJobs(searchValue.replace(/\s/g, '%'));
    }
  }, [searchValue, searchJobs]);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <main className='Container mb-4 bg-image'>
      <header className='header'>
        <image className="logo" src="./Assets/logo.png" alt="logo"></image>
       
         
    

            <nav className='nav'>
              <ul className="navLinks">
                <li>
                  <a href='#'>HOME</a>
                </li>
                <li>
                  <a href='#'>SIGN UP</a>
                </li>
                <li>
                  <a href='#'>LOGIN</a>
                </li>
              </ul>
            </nav>
            <a class="cta" href="#"><button className="contact">Contact</button></a>
          
        <h1 className='headerTitle'></h1>
      </header>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(searchInput);
        }}
      >
        <div className='searchBox'>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          name='description'
          type='text'
          placeholder='Job, Location'
          
        />
        </div>
        <div className="searchBox">
          <button id="searchBtn" type='submit'>SEARCH</button>
        </div>
        <form className="optionsForm">
          <div>
          <input
          className="filterCheckBox"
            type='checkbox'
            onClick={() => {
              setSearchInput('');
              setSearchValue('frontend');
            }}
          />
            <span>Frontend</span>
            </div>
        <div>
          <input
          className="filterCheckBox"
          type='checkbox'
          onClick={() => {
            setSearchInput('');
            setSearchValue('Backend');
          }}
          />
            <span>Backend</span>
    
        </div>
        <div>
          <input
          className="filterCheckBox"
          type='checkbox'
          onClick={() => {
            setSearchInput('');
            setSearchValue('UI | UX');
          }}
          />
            UI / UX
          
        </div>
          </form>
      </form>

      <JobsPagination totalPages={totalPages} page={page} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      <section className='jobs-container'>
        {jobs?.map((job) => {
          // console.log(job)
          return <Job key={job.id} job={job} />;
        })}
      </section>

      <JobsPagination totalPages={totalPages} page={page} setPage={setPage} />
      <footer>Footer</footer>
    </main>
  );
}

export default App;
