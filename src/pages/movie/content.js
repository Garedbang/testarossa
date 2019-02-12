import React from 'react';

import List from './list';
import AddToFavoriteButton from '../../components/addToFavoritesButton';

export default ({
  favoritesList,
  addToFavorites,
  removeFromFavorites,
  movie,
  movie: {
    production_countries,
    release_date,
    title,
    overview,
    genres,
    tagline,
    budget
  } = {}
}) => (
  <div className="content">
    <h2 className="title">{title}</h2>
    <span className="tagline">{`"${tagline}"`}</span>
    {genres && <List data={genres} title="Genre" />}
    {production_countries && (
      <List data={production_countries} title="Country" />
    )}
    <span className="default-text">Year: {release_date || 'No info'}</span>
    <span className="default-text">
      Budget: {parseInt(budget, 10) > 0 ? budget : 'No info'}$
    </span>
    <span className="overview">{overview || 'Overview don`t added'}</span>
    {movie && (
      <AddToFavoriteButton
        movie={movie}
        favoritesList={favoritesList}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        isMoviePage
      />
    )}
  </div>
);
