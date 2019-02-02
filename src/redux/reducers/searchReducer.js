import {
  SET_SEARCH,
  SET_SEARCH_INITIAL,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAIL
} from '../constants/searchConstants';

const initialState = {
  isFetched: false,
  error: null,
  movies: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_REQUEST:
      return {
        ...state,
        isFetched: true
      };

    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        isFetched: false
      };

    case GET_SEARCH_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      };

    case SET_SEARCH: {
      return {
        ...state,
        movies: action.payload
      };
    }
    case SET_SEARCH_INITIAL: {
        return {
            state: initialState
        }
    }
    default:
      return state;
  }
}
