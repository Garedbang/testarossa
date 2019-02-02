import {
  ADD_MOVIE_TO_FAVORITE,
  REMOVE_MOVIE_FROM_FAVORITE,
  TOGGLE_FAVOTIRE_LIST
} from '../constants/favoritesСonstants';

export function addMovieToFavorite(movie) {
  return {
    type: ADD_MOVIE_TO_FAVORITE,
    movie
  };
}

export function removeMovieFromFavorite(id) {
  return {
    type: REMOVE_MOVIE_FROM_FAVORITE,
    id
  };
}

export function toggleFavoriteList() {
  return {
    type: TOGGLE_FAVOTIRE_LIST
  };
}