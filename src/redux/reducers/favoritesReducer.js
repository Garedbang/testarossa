import {
  ADD_MOVIE_TO_FAVORITE,
  REMOVE_MOVIE_FROM_FAVORITE
} from '../constants/favoritesСonstants';

const initialState = {
  list: []
};

const favoritesList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE_TO_FAVORITE: {
      const position = state.list.length || 0;
      const addMovie = [
        ...state.list,
        {
          id: action.movie.id,
          release_date: action.movie.release_date,
          poster_path: action.movie.poster_path,
          title: action.movie.title,
          index: position
        }
      ];
      return {
        ...state,
        list: addMovie
      };
    }
    case REMOVE_MOVIE_FROM_FAVORITE: {
      return {
        list: state.list.filter(item => item.id !== action.id)
      };
    }

    default:
      return state;
  }
};

export default favoritesList;
