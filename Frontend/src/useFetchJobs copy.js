import { useReducer, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
};

//create proxy server to get around CORS issue, then paste api URL//
const api_id = 'b082a4d4';
const api_key = '59640a0e8433d682fbf4e629ad57517a';
// const BASE_URL =
// 'http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b082a4d4&app_key=59640a0e8433d682fbf4e629ad57517a&results_per_page=20&what=javascript%20developer&content-type=application/json';
const url =
  'https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b082a4d4&app_key=59640a0e8433d682fbf4e629ad57517a';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };

    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };

    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(url, {
        // cancelToken: cancelToken1.token,
        // params: {markdown: true, page: page, ...params}
      })
      .then((res) => {
        console.log(res.data);
        // dispatch({ type: ACTIONS.GET_DATA, payload: {jobs: res.data} })
      })
      .catch((e) => {
        console.log(e);
        if (axios.isCancel(e)) return;

        // dispatch({type: ACTIONS.ERROR, payload: { error: e} })
      });
    // fetch(url)
    // .then(res => res.json())
    // .then(console.log)

    // axios.get(BASE_URL, {
    //   cancelToken: cancelToken2.token,
    //   params: {markdown: true, page: page + 1, ...params}
    // }).then(res => {
    //   dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: {hasNextPage: res.data.length !== 0 }})
    // }).catch(e => {
    //   if (axios.isCancel(e)) return
    //   dispatch({type: ACTIONS.ERROR, payload: { error: e} })
    // })

    return () => {
      cancelToken1.cancel();
      // cancelToken2.cancel()
    };
  }, [params, page]);

  return state;
}
