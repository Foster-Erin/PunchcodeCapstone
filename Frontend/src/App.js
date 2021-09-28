import useFetchJobs from "./useFetchJobs";
import React, { useState } from "react";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import "./App.css";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages, searchJobs } = useFetchJobs(
    params,
    page
  );
  const [searchValue, setSearchValue] = useState("");
  const [cleanSearchVal, setCleanSearchVal] = useState("");
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
              <span></span>
            </label>
            </nav>

          </div>
        </div>
        {/* <h1 className=" headerTitle mb-4"></h1> */}
      </header>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <form onSubmit={handleSearch}>
        <input
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
