import React from 'react'
import { NavLink } from 'react-router-dom'
import TextTruncate from 'react-text-truncate';

import AddToFavoriteButton from './addToFavoritesButton'

export default ({movie, favoritesList, addToFavorites, removeFromFavorites, className, api, hideSearchLine}) => (
      <li className={className}>
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}?api_key=${api}`}
          alt={`${movie.original_title} poster`}
        />
        <NavLink
          to={`/movie/${movie.id}`}
          onClick={hideSearchLine}
        >
          <TextTruncate
              line={3}
              truncateText="…"
              text={movie.original_title}
            />
            {movie.release_date &&(<span>({movie.release_date.split('-')[0]})</span>)}

        </NavLink>
        <AddToFavoriteButton
          movie={movie}
          favoritesList={favoritesList}
          removeFromFavorites={removeFromFavorites}
          addToFavorites={addToFavorites}
        />
      </li>
    )
