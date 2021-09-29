import useFetchJobs from './useFetchJobs';
import React, { useState, useEffect } from 'react';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import FilterCheckbox from './FilterCheckbox';
import Header from './Header';
import Searchbox from './Searchbox';
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
      <Header />
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(searchInput);
        }}
      >
        <Searchbox />
        <div className='optionsForm'>
          {[
            { label: 'Frontend', staticSearchTerm: 'frontend' },
            { label: 'Backend', staticSearchTerm: 'backend' },
            { label: 'UI/UX', staticSearchTerm: 'UI | UX' },
          ].map((filterCheckbox) => (
            <FilterCheckbox
              key={filterCheckbox.label}
              setSearchInput={setSearchInput}
              setSearchValue={setSearchValue}
              label={filterCheckbox.label}
              staticSearchTerm={filterCheckbox.staticSearchTerm}
            />
          ))}
        </div>
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
