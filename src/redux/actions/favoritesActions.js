import {
  ADD_MOVIE_TO_FAVORITE,
  REMOVE_MOVIE_FROM_FAVORITE
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
