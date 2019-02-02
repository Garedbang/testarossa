import React from 'react';
import { NavLink } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import AddToFavoriteButton from './addToFavoritesButton';
import MovieCard from './movieCard';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleMoreRecommendations: false,
      recommendationsInLine: 4
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.handleGetMovie(match.params.pathParam);
    this.updateRecommendationCounter();
    window.addEventListener('resize', this.updateRecommendationCounter);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match.params.pathParam !== prevProps.match.params.pathParam) {
      this.handleGetMovie(match.params.pathParam);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateRecommendationCounter);
  }

  handleGetMovie = id => {
    const last = this.props.lastLocation
      ? this.props.lastLocation.pathname
      : null;
    this.props.getMovie(id, this.props.api, last);
    this.setState({ toggleMoreRecommendations: false });
  };

  showMoreRecommendations = () => {
    this.setState({ toggleMoreRecommendations: true });
  };

  updateRecommendationCounter = () => {
    if (window.innerWidth > 1200 && this.state.recommendationsInLine !== 6) {
      this.setState({
        recommendationsInLine: 6
      });
    } else if (
      window.innerWidth < 1200 &&
      this.state.recommendationsInLine !== 4
    ) {
      this.setState({
        recommendationsInLine: 4
      });
    }
  };

  render() {
    const { recommendationsInLine, toggleMoreRecommendations } = this.state;
    const {
      api,
      favoritesList,
      addToFavorites,
      removeFromFavorites
    } = this.props;
    const {
      poster_path,
      production_countries,
      release_date,
      title,
      overview,
      genres,
      tagline,
      budget,
      recommendation,
      comeFromPage
    } = this.props.movie.displayedMovie;

    return (
      <div className="movie-page">
        <div className="left-side">
          <NavLink
            className="back"
            to={comeFromPage || `/popular/${this.props.currentPopularPage}`}
          >
            Back
          </NavLink>
          <div className="poster">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}?api_key=${api}`}
              alt={`${title} poster`}
            />
          </div>
        </div>
        <div className="right-side">
          <h2 className="title">{title}</h2>
          {tagline && <span className="tagline">{`"${tagline}"`}</span>}
          {genres && (
            <ul>
              <li>Genre: </li>
              {genres.length > 0 ? (
                genres.map((ganr, index) => (
                  <li key={ganr.name}>
                    {ganr.name}
                    {genres.length - 1 > index && ', '}
                  </li>
                ))
              ) : (
                <li>Genres didn`t added</li>
              )}
            </ul>
          )}

          {production_countries && (
            <ul>
              <li>Country{production_countries.length - 1 > 0 && 's'}: </li>
              {production_countries.length > 0 ? (
                production_countries.map((country, index) => (
                  <li key={country.name}>
                    {country.name}
                    {production_countries.length - 1 > index && ', '}
                  </li>
                ))
              ) : (
                <li>Country didn`t added</li>
              )}
            </ul>
          )}
          <span className="default-text">Year: {release_date ? release_date.split('-')[0] : 'No info'}</span>
          {parseInt(budget, 10) > 0 && (
            <span className="default-text">Budget: {budget}$</span>
          )}
          <span className="overview">
            {overview || 'Overview didn`t added'}
          </span>
          <AddToFavoriteButton
            movie={this.props.movie.displayedMovie}
            favoritesList={favoritesList}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isMoviePage
          />
        </div>
        <h4 className="page-description">Recomendation for that movie</h4>
        <ul className="recomendation">
          {recommendation &&
            recommendation
              .slice(0, recommendationsInLine)
              .map(movie => (
                <MovieCard
                  className="list-item movie-card"
                  api={api}
                  key={movie.id}
                  movie={movie}
                  favoritesList={favoritesList}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              ))}
          {toggleMoreRecommendations &&
            recommendation
              .slice(recommendationsInLine)
              .map(movie => (
                <MovieCard
                  className="list-item movie-card"
                  api={api}
                  key={movie.id}
                  movie={movie}
                  favoritesList={favoritesList}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              ))}
        </ul>
        {recommendation &&
          (toggleMoreRecommendations &&
            recommendation.length < recommendationsInLine) && (
            <h4 className="no-recommendation">
              We are doesn`t have {recommendation.length > 0 && 'more'}{' '}
              recommendation for that movie:(
            </h4>
          )}
        {recommendation &&
          recommendation.length - 1 > recommendationsInLine &&
          !toggleMoreRecommendations && (
            <button
              type="button"
              className="show-more-recommendations"
              onClick={this.showMoreRecommendations}
            >
              Show more recommendations
            </button>
          )}
      </div>
    );
  }
}

export default withLastLocation(MoviePage);
