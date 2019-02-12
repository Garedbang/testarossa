import React from 'react';

import MovieCard from '../../components/movieCard';

export default ({
  movies,
  api,
  favoritesList,
  addToFavorites,
  removeFromFavorites,
  recLineCounter
}) => (
  <ul className="main-content">
    {movies.map(movie => (
      <MovieCard
        className="list-item movie-card"
        api={api}
        key={movie.id}
        movie={movie}
        favoritesList={favoritesList}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        recLineCounter={recLineCounter}
      />
    ))}
  </ul>
);
