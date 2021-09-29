<<<<<<< Updated upstream
import useFetchJobs from "./useFetchJobs";
import React, { useState } from "react";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import "./App.css";
=======
import useFetchJobs from './useFetchJobs';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
>>>>>>> Stashed changes

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages, searchJobs } = useFetchJobs(
    params,
    page
  );
<<<<<<< Updated upstream
  const [searchValue, setSearchValue] = useState("");
  const [cleanSearchVal, setCleanSearchVal] = useState("");
  // const [foundJobs, setFoundJobs] = useState([]);
=======
  const [searchValue, setSearchValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (typeof searchJobs === 'function') {
      searchJobs(searchValue.replace(/\s/g, '%'));
    }
  }, [searchValue, searchJobs]);

>>>>>>> Stashed changes
  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

<<<<<<< Updated upstream
  function handleChange(e) {
    setSearchValue(e.target.value);
    const clean = searchValue.replace(/\s/g, "%");
    setCleanSearchVal(clean);
  }
  return (
    <main className="Container mb-4 bg-image">
      {/* <div className="bg-image"> */}
      <header className="header">
          <div class="navRow align-items-center justify-content-between">
            <div class="logo">
              <a href="#">LOGO</a>
            </div>
        <div id="navContainer">
            <nav className="nav">
              <ul>
                <li>
                  <a href="#"></a>
                </li>
                <li>
                  <a href="#">HOME</a>
                </li>
                <li>
                  <a href="#">SIGN UP</a>
                </li>
                <li>
                  <a href="#">LOGIN</a>
                </li>
              </ul>
            <input type="checkbox" id="navCheck" />
            <label for="navCheck" className="navToggle">
=======
  return (
    <Container className='Container mb-4'>
      <header className='header'>
        <div id='navContainer'>
          <div class='navRow align-items-center justify-content-between'>
            <div class='logo'>
              <a href='#'>LOGO</a>
            </div>
            <input type='checkbox' id='navCheck' />
            <label htmlFor='navCheck' className='navToggle'>
>>>>>>> Stashed changes
              <span></span>
            </label>
            </nav>

<<<<<<< Updated upstream
          </div>
        </div>
        {/* <h1 className=" headerTitle mb-4"></h1> */}
=======
            <nav className='nav'>
              <ul>
                <li>
                  <a href='#'></a>
                </li>
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
          </div>
        </div>
        <h1 className=' headerTitle mb-4'></h1>
>>>>>>> Stashed changes
      </header>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(searchInput);
        }}
      >
        <input
<<<<<<< Updated upstream
          onChange={handleChange}
          value={searchValue}
          name="description"
          type="text"
          id="jobSearchBar"
        />
        <div>
          <button id="searchButton" type="button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
       
=======
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          name='description'
          type='text'
          id='jobSearchBar'
        />
        <div>
          <button type='submit'>SEARCH</button>
        </div>
        <div>
          <button
            type='button'
            onClick={() => {
              setSearchInput('');
              setSearchValue('frontend');
            }}
          >
            Frontend
          </button>
        </div>
        <div>
          <button
            type='button'
            onClick={() => {
              setSearchInput('');
              setSearchValue('Backend');
            }}
          >
            Backend
          </button>
        </div>
        <div>
          <button
            type='button'
            onClick={() => {
              setSearchInput('');
              setSearchValue('UI | UX');
            }}
          >
            UI / UX
          </button>
        </div>
>>>>>>> Stashed changes
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
      {/* </div> */}
      
      <footer>
        Footer
      </footer>
    </main>
  );
}

export default App;
