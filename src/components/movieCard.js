import React from 'react';
import { NavLink } from 'react-router-dom';

import Image from './image';
import AddToFavoriteButton from './addToFavoritesButton';
import Shortener from './shortener';

export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullName: false,
      showDetails: false
    };
  }

  handleFullName = () => {
    this.setState(prevState => ({
      showFullName: !prevState.showFullName
    }));
  };

  handleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    const {
      movie,
      favoritesList,
      addToFavorites,
      removeFromFavorites,
      className,
      api,
      recLineCounter
    } = this.props;
    const { showFullName, showDetails } = this.state;

    return (
      <li
        className={className}
        onMouseEnter={this.handleDetails}
        onMouseLeave={this.handleDetails}
      >
        <Image movie={movie} api={api} />
        {showDetails && (
          <div className="details">
            <NavLink
              className="name"
              onMouseEnter={this.handleFullName}
              onMouseLeave={this.handleFullName}
              to={`/movie/${movie.id}`}
            >
              {showFullName ? (
                movie.title
              ) : (
                <Shortener recLineCounter={2} text={movie.title} />
              )}
            </NavLink>
            <Shortener
              text={movie.overview}
              recLineCounter={recLineCounter}
              className="overview"
            />
            <div className="links">
              <NavLink className="link-to-movie" to={`/movie/${movie.id}`}>
                Read more
              </NavLink>
              <AddToFavoriteButton
                movie={movie}
                favoritesList={favoritesList}
                removeFromFavorites={removeFromFavorites}
                addToFavorites={addToFavorites}
              />
            </div>
          </div>
        )}
      </li>
    );
  }
}
