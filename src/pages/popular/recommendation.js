import React, { Fragment } from 'react';

import MovieCard from '../../components/movieCard';

export default class Recommendation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleMoreRecommendations: this.props.showMoreRecommendations
    };
  }

  showMoreRecommendations = () => {
    this.setState({ toggleMoreRecommendations: true });
  };

  render() {
    const { toggleMoreRecommendations } = this.state;
    const {
      recommendation,
      api,
      favoritesList,
      addToFavorites,
      removeFromFavorites,
      recommendationsInLine,
      recLineCounter
    } = this.props;
    return (
      <Fragment>
        <h4 className="page-description">Recommendation for that movie</h4>
        {recommendation.length < 1 && (
          <h4 className="no-recommendation">
            We have no recommendations for that movie, you can check later
          </h4>
        )}
        <ul className="recomendation">
          {recommendation.slice(0, recommendationsInLine).map(movie => (
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
                  recLineCounter={recLineCounter}
                />
              ))}
        </ul>
        {toggleMoreRecommendations &&
          recommendation.length < recommendationsInLine && (
            <h4 className="no-recommendation">
              We are doesn`t have {recommendation.length > 0 && 'more'}
              recommendation for that movie:(
            </h4>
          )}
        {recommendation.length - 1 > recommendationsInLine &&
          !toggleMoreRecommendations && (
            <button
              type="button"
              className="show-more-recommendations"
              onClick={this.showMoreRecommendations}
            >
              Show more recommendations
            </button>
          )}
      </Fragment>
    );
  }
}
