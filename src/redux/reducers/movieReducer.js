import {
  SET_MOVIE,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
  GET_RECOMMENDATION_REQUEST,
  GET_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATION_FAIL
} from '../constants/movieConstants';

const initialState = {
  isFetched: false,
  error: null,
  movies: [],
  displayedMovie: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_REQUEST || GET_RECOMMENDATION_REQUEST:
      return {
        ...state,
        isFetched: true
      };

    case GET_MOVIE_SUCCESS || GET_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        isFetched: false
      };

    case GET_MOVIE_FAIL || GET_RECOMMENDATION_FAIL:
      return {
        ...state,
        isFetched: true,
        error: action.payload
      };

    case SET_MOVIE: {
      const addMovie = [...state.movies, action.payload.movie];
      return {
        ...state,
        displayedMovie: action.payload.movie,
        movies: action.payload.inList ? state.movies : addMovie
      };
    }
    default:
      return state;
  }
}
