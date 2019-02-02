import {
  SET_POPULAR,
  GET_POPULAR_REQUEST,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAIL
} from '../constants/popularConstants';

const initialState = {
  isFetched: false,
  error: null,
  movies: [],
  currentPage: 1,
  allPages: 1,
  displayedMovies: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR_REQUEST:
      return {
        ...state,
        isFetched: true
      };

    case GET_POPULAR_SUCCESS:
      return {
        ...state,
        isFetched: false
      };

    case GET_POPULAR_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      };

    case SET_POPULAR: {
      const addPopular = [
        ...state.movies,
        {
          page: action.payload.page,
          movies: action.payload.movies,
          allPages: action.payload.allPages
        }
      ];
      return {
        ...state,
        displayedMovies: action.payload.movies,
        currentPage: action.payload.page,
        allPages: action.payload.allPages,
        movies: !action.payload.inList ? addPopular : state.movies
      };
    }
    default:
      return state;
  }
}
