import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import testData from './testData';

const app_id = 'b082a4d4';
const app_key = '59640a0e8433d682fbf4e629ad57517a';
const base_url = 'https://api.adzuna.com/v1/api';
const search_url = base_url + '/jobs/us/search';

function getUrl({ searchTerms, results_per_page = 10, page = 1 }) {
  let url = `${search_url}/1?app_id=${app_id}&app_key=${app_key}&results_per_page=${results_per_page}&what_or=developer%20web%20UI%20UX%20junior%20programing%20HTML%20CSS%20javascript%20frontend&what_exclude=sr.%20senior%20mid%20lead%20&title_only=developer&max_days_old=30`;
  if (searchTerms) {
    url += `&what=${searchTerms}`;
  }
  return url;
}
const pastApiRateLimit = false;

export default function useFetchJobs(params, page) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  function searchJobs(searchTerms) {
    if (searchTerms === '') return;
    console.log('searching', searchTerms);
    // return;
    setLoading(true);
    if (!pastApiRateLimit) {
      axios
        .get(getUrl({ searchTerms }))
        .then((res) => {
          setLoading(false);
          console.log(res);
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
  const memoizedSearchJobs = useCallback(
    (searchTerms) => searchJobs(searchTerms),
    []
  );
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
  return { loading, jobs, totalPages, searchJobs: memoizedSearchJobs };
}
