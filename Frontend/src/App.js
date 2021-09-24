import useFetchJobs from "./useFetchJobs";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import axios from "axios";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages, searchJobs } = useFetchJobs(params, page);
  const [searchValue, setSearchValue] = useState("");
  const [cleanSearchVal, setCleanSearchVal] = useState("");
  const [foundJobs, setFoundJobs] = useState([]);
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
    searchJobs(cleanSearchVal)
  }

  function handleChange(e) {
    
    setSearchValue(e.target.value);
    const clean = searchValue.replace(/\s/g, '%')
    setCleanSearchVal(clean)
  }
  return (
    <Container className="mb-4">
      <h1 className="mb-4">JR. DEV JOB SEARCH</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form onSubmit={handleSearch}>
          <input
          onChange={handleChange}
          value={searchValue}
          name="description"
          type="text"
          id="searchBar"
         />
        <button type="button" onClick={handleSearch}>
          SEARCH
        </button>
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
