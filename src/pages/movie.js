import React, { Fragment } from 'react';
import { withLastLocation } from 'react-router-last-location';

import Recommendation from '../components/recommendation';
import AddToFavoriteButton from '../components/addToFavoritesButton';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendationsInLine: 4
    };
  }

  componentDidMount() {
    this.handleGetMovie(this.props.match.params.pathParam);
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
    this.props.getMovie(Number(id), this.props.api);
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
    const {
      api,
      favoritesList,
      addToFavorites,
      removeFromFavorites,
      history,
      movie: {
        displayedMovie: {
          poster_path,
          production_countries,
          release_date,
          title,
          overview,
          genres,
          tagline,
          budget,
          recommendation
        } = {}
      } = {}
    } = this.props;
    return (
      <div className="movie-page">
        <button
          type="button"
          className="back"
          onClick={() =>
            this.props.lastLocation
              ? history.goBack()
              : history.push('/popular/1')
          }
        >
          Back
        </button>
        {this.props.movie.isFetched ? (
          <Fragment>
            <h4>
              {this.props.movie.error ? this.props.movie.error : 'LOADING'}
            </h4>
            {this.props.movie.error && (
              <button
                className="default-button"
                type="button"
                onClick={() =>
                  this.props.getMovie(
                    Number(this.props.match.params.pathParam),
                    this.props.api
                  )
                }
              >
                Try one more time
              </button>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div className="left-side">
              <div className="poster">
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}?api_key=${api}`}
                  alt={`${title} poster`}
                />
              </div>
            </div>
            <div className="right-side">
              <h2 className="title">{title}</h2>
              <span className="tagline">{`"${tagline}"`}</span>
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
              <span className="default-text">
                Year: {release_date ? release_date.split('-')[0] : 'No info'}
              </span>
              {parseInt(budget, 10) > 0 && (
                <span className="default-text">Budget: {budget}$</span>
              )}
              <span className="overview">
                {overview || 'Overview didn`t added'}
              </span>
              {this.props.movie.displayedMovie && (
                <AddToFavoriteButton
                  movie={this.props.movie.displayedMovie}
                  favoritesList={favoritesList}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isMoviePage
                />
              )}
            </div>
            {recommendation && (
              <Recommendation
                api={api}
                favoritesList={favoritesList}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                recommendation={recommendation}
                recommendationsInLine={this.state.recommendationsInLine}
                showMoreRecommendations={false}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default withLastLocation(MoviePage);
