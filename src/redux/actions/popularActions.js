import {
  SET_POPULAR,
  GET_POPULAR_REQUEST,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAIL
} from '../constants/popularConstants';

function setPopular(data, inList) {
  const page = inList
    ? { page: data.page, movies: data.movies, allPages: data.allPages, inList }
    : { page: data.page, movies: data.results, allPages: data.total_pages };

  return {
    type: SET_POPULAR,
    payload: page
  };
}

function fetchData(page, api) {
  return dispatch => {
    dispatch({
      type: GET_POPULAR_REQUEST
    });

    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api}&page=${page}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then(data => {
        dispatch({
          type: GET_POPULAR_SUCCESS
        });
        dispatch(setPopular(data));
      })
      .catch(error => {
        dispatch({
          type: GET_POPULAR_FAIL,
          payload: error.message
        });
      });
  };
}

export default function getPopular(page, api) {
  return (dispatch, getState) => {
    const findPage = getState().popularReducer.movies.find(
      movie => movie.page === page && movie
    );
    if (findPage) {
      dispatch({
        type: GET_POPULAR_SUCCESS
      });
      dispatch(setPopular(findPage, true));
    } else {
      dispatch(fetchData(page, api));
    }
  };
}
