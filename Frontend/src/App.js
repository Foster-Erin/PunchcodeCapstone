import useFetchJobs from './useFetchJobs';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import axios from 'axios';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages } = useFetchJobs(params, page);
 const [searchValue, setSearchValue] = useState("");
 const [foundJobs, setFoundJobs]= useState([]);
  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };
  // console.log(page)

function handleSearch(e){
  e.preventDefault()
axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=b082a4d4&app_key=59640a0e8433d682fbf4e629ad57517a&results_per_page=10&what=${searchValue}&what_exclude=senior%20sr.%20mid%20IT&where=us`)
.then((res) => {
  setFoundJobs(res.data.results)
})
}
// console.log(foundJobs)

function handleChange(e){
  setSearchValue(e.target.value)
  // console.log(searchValue)
}

  return (
    <Container className='mb-4'>
      <h1 className='mb-4'>JR. DEV JOB SEARCH</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form>
      <input onChange={handleChange}
      value={searchValue}  
      name='description' 
      type="text"
      id="searchBar" />
      <button type="button" onClick={handleSearch} >SEARCH</button>
      </form>
      <JobsPagination totalPages={totalPages} page={page} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs?.map((job) => (
        <Job key={job.id} job={job}/>
      ))}
      
      <JobsPagination totalPages={totalPages} page={page} setPage={setPage} />
    </Container>
  );
}

export default App;
