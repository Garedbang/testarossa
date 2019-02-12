import React, { Fragment } from 'react';

export default ({ api, movie }) => (
  <Fragment>
    {movie.poster_path && (
      <img
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
          movie.poster_path
        }?api_key=${api}`}
        alt={`${movie.title} poster`}
      />
    )}
  </Fragment>
);
