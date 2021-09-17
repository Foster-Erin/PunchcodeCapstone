import { useReducer, useEffect } from "react";


const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

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

    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

  useEffect(()=> {
      dispatch({type: ACTIONS.MAKE_REQUEST})
  }, [params, page])


  return {
    jobs: [1, 2, 3],
    loading: true,
    error: true,
  };
}
