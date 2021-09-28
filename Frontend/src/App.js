import useFetchJobs from './useFetchJobs';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages, searchJobs } = useFetchJobs(
    params,
    page
  );
  const [searchValue, setSearchValue] = useState('');
  const [cleanSearchVal, setCleanSearchVal] = useState('');
  // const [foundJobs, setFoundJobs] = useState([]);
  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }
  function handleSearch(e) {
    e.preventDefault();
    searchJobs(cleanSearchVal);
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
    const clean = searchValue.replace(/\s/g, '%');
    setCleanSearchVal(clean);
  }
  return (
    <Container className="Container mb-4">
      <header className="header">
        <div id="navContainer">
          <div class="navRow align-items-center justify-content-between">
            <div class="logo">
              <a href="#">LOGO</a>
            </div>

        <nav className="nav">
        <ul>
          <li><a href="#"></a></li>
          <li><a href="#">HOME</a></li>
          <li><a href="#">SIGN UP</a></li>
          <li><a href="#">LOGIN</a></li>
          
        </ul>
        </nav>
        </div>
        </div>
        <h1 className=" headerTitle mb-4">JR. DEV JOB SEARCH</h1>
      </header>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form onSubmit={handleSearch}>
        <input
          onChange={handleChange}
          value={searchValue}
          name='description'
          type='text'
          id='jobSearchBar'
        />
        <div>
          <button type='button' onClick={handleSearch}>
            SEARCH
          </button>
        </div>
        {/* <div>
        <input
          onChange={handleChange}
          value={searchValue}
          name="description"
          type="text"
          id="locationBar"
        />
          <button type="button" onClick={handleSearch}>
            LOCATION
          </button>
          </div> */}
      </form>

      <JobsPagination totalPages={totalPages} page={page} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs?.map((job) => {
        // console.log(job)
        return <Job key={job.id} job={job} />;
      })}

      <JobsPagination totalPages={totalPages} page={page} setPage={setPage} />
    </Container>
  );
}

export default App;
