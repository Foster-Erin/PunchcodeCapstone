import useFetchJobs from './useFetchJobs';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }
  console.log(page);

  return (
    <Container className='mb-4'>
      <h1 className='mb-4'>JR. DEV JOB SEARCH</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination totalPages={7} page={page} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs?.map((job) => (
        <Job key={job.id} job={job} />
      ))}
      {/* <JobsPagination totalPages={7} page={page} setPage={setPage} /> */}
    </Container>
  );
}

export default App;
