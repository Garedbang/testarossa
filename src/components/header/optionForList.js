import React from 'react';
import { NavLink } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

import Image from '../image';
import AddToFavoriteButton from '../addToFavoritesButton';

export default ({
  movie,
  favoritesList,
  addToFavorites,
  removeFromFavorites,
  className,
  api,
  hideDropDown
}) => (
  <li className={className}>
    <Image movie={movie} api={api} />
    <NavLink to={`/movie/${movie.id}`} onClick={hideDropDown}>
      <TextTruncate line={3} truncateText="…" text={movie.title} />
      {movie.release_date && <span>({movie.release_date.split('-')[0]})</span>}
    </NavLink>
    <AddToFavoriteButton
      movie={movie}
      favoritesList={favoritesList}
      removeFromFavorites={removeFromFavorites}
      addToFavorites={addToFavorites}
    />
  </li>
);
