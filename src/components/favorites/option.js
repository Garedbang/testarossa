import React from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '../../images/favorite-icon'

export default ({ className, api, removeFromFavorites, movie }) => (
                  <li className={className}>
                    <img
                      src={ `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}?api_key=${api}` }
                      alt={`${movie.title} poster`}
                    />
                    <NavLink
                      to={`/movie/${movie.id}`}
                    >{movie.title}
                    </NavLink>
                    <button type="button"
                      onClick={() => removeFromFavorites(movie.id)}
                    ><Icon color="#EC5A0F" fill/>
                    </button>
                  </li>
        )
