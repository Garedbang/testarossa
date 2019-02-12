import React, { Fragment } from 'react';
import { withLastLocation } from 'react-router-last-location';

import Sidebar from './sidebar';
import Content from './content';
import Recommendation from '../popular/recommendation';
import GetDataError from '../../components/getDataError';

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
        isFetched,
        error,
        displayedMovie,
        displayedMovie: { recommendation } = {}
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
        {isFetched ? (
          <GetDataError
            error={error}
            link={this.props.match.params.pathParam}
            getData={this.handleGetMovie}
            title="Wait a second, content is loading!"
          />
        ) : (
          <Fragment>
            <Sidebar movie={displayedMovie} api={api} />
            {displayedMovie && (
              <Content
                movie={displayedMovie}
                favoritesList={favoritesList}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            )}
            {recommendation && (
              <Recommendation
                api={api}
                favoritesList={favoritesList}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                recommendation={recommendation}
                recommendationsInLine={this.state.recommendationsInLine}
                showMoreRecommendations={false}
                recLineCounter={this.props.recLineCounter}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
export default withLastLocation(MoviePage);
