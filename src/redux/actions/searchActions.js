import {
  SET_SEARCH,
  SET_SEARCH_INITIAL,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAIL
} from '../constants/searchConstants';

function setSearch(data) {
  return {
    type: SET_SEARCH,
    payload: data.results
  };
}

export function setInitialSearch() {
  return { type: SET_SEARCH_INITIAL };
}

export default function getSearch(query, api) {
  return dispatch => {
    dispatch({
      type: GET_SEARCH_REQUEST
    });

    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then(data => {
        dispatch({
          type: GET_SEARCH_SUCCESS
        });
        dispatch(setSearch(data));
      })
      .catch(error => {
        dispatch({
          type: GET_SEARCH_FAIL,
          payload: error.message
        });
      });
  };
}
