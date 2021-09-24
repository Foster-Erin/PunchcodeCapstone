import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { reducer, ACTIONS } from './reducer';
import testData from './testData';

const app_id = 'b082a4d4';
const app_key = '59640a0e8433d682fbf4e629ad57517a';
const base_url = 'https://api.adzuna.com/v1/api';

function getUrl({ results_per_page = 10, page = 1 }) {
  return 'https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=b082a4d4&app_key=59640a0e8433d682fbf4e629ad57517a&results_per_page=30&what=entry%20level%20developer&what_exclude=senior%20sr.%20mid%20IT';
  return `${base_url}/jobs/us/search/${page}?app_id=${app_id}&app_key=${app_key}&results_per_page=${results_per_page}`;
}
export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    hasNextPage: false,
    error: null,
  });
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
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

    // NOTE: hack to avoid rate limiting on the api
    // setLoading(false);
    // setJobs(testData?.data?.results);

    // setTotalPages(
    //   Math.ceil(
    //     testData?.data?.count / Math.max(testData?.data?.results?.length, 1)
    //   )
    // );

    return () => {
      cancelToken1.cancel();
    };
  }, [params, page]);

  // return state;
  return { loading, jobs, totalPages };
}
