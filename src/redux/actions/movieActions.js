import {
  SET_MOVIE,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
  GET_RECOMMENDATION_REQUEST,
  GET_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATION_FAIL
} from '../constants/movieConstants';

function setMovie(data, inList) {
  const inListCheck = data[0] === undefined ? true : inList;
  function removeSpacesFromDataNames() {
    const movie = data[0];

    if (!inList && movie !== undefined) {
      movie.recommendation = data[1].results;

      if (movie.budget > 0) {
        movie.budget = movie.budget
          .toString()
          .replace(/\d(?=(\d{3})+$)/g, `$& `);
      }

      return movie;
    }
    return movie;
  }
  const movieData = inList
    ? { movie: data, inList }
    : { movie: removeSpacesFromDataNames(), inList: inListCheck };
  return {
    type: SET_MOVIE,
    payload: movieData
  };
}

function fetchMovie(id, api) {
  return dispatch => {
    dispatch({
      type: GET_MOVIE_REQUEST
    });

    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then(data => {
        dispatch({
          type: GET_MOVIE_SUCCESS
        });
        return data;
      })
      .catch(error => {
        dispatch({
          type: GET_MOVIE_FAIL,
          payload: error.message
        });
      });
  };
}

function fetchRecommendation(id, api) {
  return dispatch => {
    dispatch({
      type: GET_RECOMMENDATION_REQUEST
    });
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then(data => {
        dispatch({
          type: GET_RECOMMENDATION_SUCCESS
        });
        return data;
      })
      .catch(error => {
        dispatch({
          type: GET_RECOMMENDATION_FAIL,
          payload: error.message
        });
      });
  };
}

function fetchData(id, api) {
  return dispatch => {
    Promise.all([
      dispatch(fetchMovie(id, api)),
      dispatch(fetchRecommendation(id, api))
    ]).then(values => {
      dispatch(setMovie(values, false));
    });
  };
}

export default function getMovie(id, api) {
  return (dispatch, getState) => {
    const findPage =
      getState().movieReducer.movies.length > 0
        ? getState().movieReducer.movies.find(
            movie => movie.id === Number(id) && movie
          )
        : null;
    if (findPage) {
      dispatch({
        type: GET_MOVIE_SUCCESS
      });
      dispatch(setMovie(findPage, true));
    } else {
      dispatch(fetchData(Number(id), api));
    }
  };
}
