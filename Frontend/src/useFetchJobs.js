import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { reducer, ACTIONS } from './reducer';
import testData from './testData';

const api_id = 'b082a4d4';
const api_key = '59640a0e8433d682fbf4e629ad57517a';
const url =
  'https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=b082a4d4&app_key=59640a0e8433d682fbf4e629ad57517a';

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    hasNextPage: false,
    error: null,
  });
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    // axios
    //   .get(url)
    //   .then((res) => {
    //     // console.log(res.data);
    //     setLoading(false);
    //     console.log(res);
    //     setJobs(res?.data?.results);
    //     // dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     if (axios.isCancel(e)) return;
    //   });

    // NOTE: hack to avoid rate limiting on the api
    setLoading(false);
    setJobs(testData?.data?.results);

    return () => {
      cancelToken1.cancel();
    };
  }, [params, page]);

  // return state;
  return { loading, jobs };
}
