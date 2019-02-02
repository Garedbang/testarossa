import React from 'react';
import { NavLink } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

import AddToFavoriteButton from './addToFavoritesButton';

export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineCounter: 1,
      showFullName: false
    };
  }

  componentDidMount() {
    this.updateLineCounter();
    window.addEventListener('resize', this.updateLineCounter);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateLineCounter);
  }

  updateLineCounter = () => {
    const { lineCounter } = this.state;
    // console.log('triggered', (60 / 100) * window.innerWidth);
    if (window.innerWidth < 400) {
      if (lineCounter !== 1) {
        this.setState({
          lineCounter: 1
        });
      }
    } else if (window.innerWidth < 454) {
      if (lineCounter !== 4) {
        this.setState({
          lineCounter: 4
        });
      }
    } else if (window.innerWidth < 545) {
      if (lineCounter !== 5) {
        this.setState({
          lineCounter: 5
        });
      }
    } else if (window.innerWidth < 850) {
      if (lineCounter !== 6) {
        this.setState({
          lineCounter: 6
        });
      }
    } else if (window.innerWidth < 1400) {
      if (lineCounter !== 5) {
        this.setState({
          lineCounter: 5
        });
      }
    } else if (window.innerWidth < 1600) {
      if (lineCounter !== 6) {
        this.setState({
          lineCounter: 6
        });
      }
    } else if (window.innerWidth < 1800) {
      if (lineCounter !== 9) {
        this.setState({
          lineCounter: 9
        });
      }
    } else if (window.innerWidth > 1800) {
      if (lineCounter !== 11) {
        this.setState({
          lineCounter: 11
        });
      }
    }
  };

  showFullName = () => {
    this.setState({
      showFullName: true
    });
  };

  hideFullName = () => {
    this.setState({
      showFullName: false
    });
  };

  render() {
    const {
      movie,
      favoritesList,
      addToFavorites,
      removeFromFavorites,
      className,
      api
    } = this.props;
    const { lineCounter, showFullName } = this.state;
    return (
      <li className={className}>
        {window.innerWidth > 850 && (
          <TextTruncate
            style={{ display: 'none' }}
            className="overview"
            line={4}
            truncateText="…"
            text={movie.overview}
          />
        )}

        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
            movie.poster_path
          }?api_key=${api}`}
          alt={`${movie.title} poster`}
        />

        <div className="details">
          <NavLink
            className="name"
            onMouseEnter={this.showFullName}
            onMouseLeave={this.hideFullName}
            to={`/movie/${movie.id}`}
          >
            {showFullName ? (
              movie.title
            ) : (
              <TextTruncate line={2} truncateText="…" text={movie.title} />
            )}
          </NavLink>
          <div className="overview">
            <TextTruncate
              line={lineCounter}
              truncateText="…"
              text={movie.overview}
            />
          </div>
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
      </li>
    );
  }
}
