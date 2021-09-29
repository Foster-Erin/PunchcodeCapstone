import useFetchJobs from './useFetchJobs';
import React, { useState, useEffect } from 'react';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import FilterCheckbox from './FilterCheckbox';
import Header from './Header';
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
  const [filterCheckboxValues, setFilterCheckboxValues] = useState([]);

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
      <Header />
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let q = [searchInput, ...filterCheckboxValues].join(' ');
          searchJobs(q.replace(/\s/g, '%20'));
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
        <div className='searchButton'>
          <button id='searchBtn' type='submit'>
            SEARCH
          </button>
        </div>
      </form>
      {/* <div>{[searchInput, ...filterCheckboxValues].join(' ')}</div> */}
      <div className='optionsForm'>
        {[
          { label: 'Frontend', staticSearchTerm: 'frontend' },
          { label: 'Backend', staticSearchTerm: 'backend' },
          { label: 'UI/UX', staticSearchTerm: 'UI | UX' },
        ].map((filterCheckbox) => (
          <FilterCheckbox
            key={filterCheckbox.label}
            label={filterCheckbox.label}
            handleClick={() => {
              if (
                filterCheckboxValues.includes(filterCheckbox.staticSearchTerm)
              ) {
                setFilterCheckboxValues((prev) =>
                  prev.filter((val) => val !== filterCheckbox.staticSearchTerm)
                );
              } else {
                setFilterCheckboxValues([
                  ...filterCheckboxValues,
                  filterCheckbox.staticSearchTerm,
                ]);
              }
            }}
          />
        ))}
      </div>

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
