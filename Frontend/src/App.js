import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useFetchJobs from "./useFetchJobs";
import React, { useState } from "react";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import FilterCheckbox from "./FilterCheckbox";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import "./App.css";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalPages, searchJobs } = useFetchJobs(
    params,
    page
  );

  const [searchInput, setSearchInput] = useState("");
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
   
    <Router>
      <main className="Container mb-4 bg-image">
        <Header />
        <Switch>
          <Route path="/login"> <LoginForm /></Route>

          <Route exact path="/">
            <section className="wrapper">
          <div className='motto'>
        <h1>Finding Newbies Their First Developer Job</h1>
        <h2 class='line-1 anim-typewriter'>
          Jobs for Bootcamp Grads & Junior Level Programmers
        </h2>
      </div>

            <SearchForm params={params} onParamChange={handleParamChange} />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                let q = [searchInput, ...filterCheckboxValues].join(" ");
                searchJobs(q.replace(/\s/g, "%20"));
              }}
            >
              <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
            </form>
           
            <div className="optionsForm">
              {[
                {
                  label: "Frontend",
                  staticSearchTerm: "frontend",
                  classes: "frontend",
                },
                {
                  label: "Backend",
                  staticSearchTerm: "backend",
                  classes: "backend",
                },
                { label: "UI/UX", staticSearchTerm: "UI | UX", classes: "ux" },
              ].map((filterCheckbox) => (
                <FilterCheckbox
                  classes={filterCheckbox?.classes}
                  key={filterCheckbox.label}
                  label={filterCheckbox.label}
                  handleClick={() => {
                    if (
                      filterCheckboxValues.includes(
                        filterCheckbox.staticSearchTerm
                      )
                    ) {
                      setFilterCheckboxValues((prev) =>
                        prev.filter(
                          (val) => val !== filterCheckbox.staticSearchTerm
                        )
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
           
            <JobsPagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error. Try Refreshing.</h1>}
            <section className="jobs-container">
              {jobs?.map((job) => {
                // console.log(job)
                return <Job key={job.id} job={job} />;
              })}
            </section>

            <JobsPagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
            </section>
          </Route>
        </Switch>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
