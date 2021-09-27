import { useEffect, useState } from "react";
import axios from "axios";
import testData from "./testData";

const app_id = "b082a4d4";
const app_key = "59640a0e8433d682fbf4e629ad57517a";
const base_url = "https://api.adzuna.com/v1/api";
const search_url = base_url + "/jobs/us/search";

function getUrl({ searchTerms, results_per_page = 10, page = 1 }) {
  let url = `${search_url}/1?app_id=${app_id}&app_key=${app_key}&results_per_page=${results_per_page}`;
  if (searchTerms) {
    url += `&what=${searchTerms}&what_exclude=senior%20sr.%20mid%20IT&where=us`;
  }
  return url;
}
const pastApiRateLimit = false;

export default function useFetchJobs(params, page) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  function searchJobs(searchTerms) {
    setLoading(true);
    if (!pastApiRateLimit) {
      axios
        .get(getUrl({ searchTerms }))
        .then((res) => {
          setLoading(false);
          // console.log(res);
          setJobs(res?.data?.results);
          setTotalPages(
            Math.ceil(
              res?.data?.count / Math.max(res?.data?.results?.length, 1)
            )
          );
        })
        .catch((e) => {
          console.log(e);
          if (axios.isCancel(e)) return;
        });
    } else {
      setLoading(false);
      setJobs(
        testData?.data?.results.filter((job) => {
          return job.title.toLowerCase().includes(searchTerms.toLowerCase());
        })
      );

      setTotalPages(
        Math.ceil(
          testData?.data?.count / Math.max(testData?.data?.results?.length, 1)
        )
      );
    }
  }
  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    if (!pastApiRateLimit) {
      setLoading(true);
      axios
        .get(getUrl({ page }))
        .then((res) => {
          // console.log(res.data);
          setLoading(false);
          // console.log(res);
          setJobs(res?.data?.results);
          setTotalPages(
            Math.ceil(
              res?.data?.count / Math.max(res?.data?.results?.length, 1)
            )
          );
        })
        .catch((e) => {
          console.log(e);
          if (axios.isCancel(e)) return;
        });
    } else {
      // NOTE: hack to avoid rate limiting on the api
      setLoading(false);
      setJobs(testData?.data?.results);

      setTotalPages(
        Math.ceil(
          testData?.data?.count / Math.max(testData?.data?.results?.length, 1)
        )
      );
    }

    return () => {
      cancelToken1.cancel();
    };
  }, [params, page]);

  // return state;
  return { loading, jobs, totalPages, searchJobs };
}
