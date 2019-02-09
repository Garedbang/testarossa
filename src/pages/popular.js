import React, { Fragment } from 'react';

import MovieCard from '../components/movieCard';
import Pagination from '../components/pagination';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCounter: 5
    };
  }

  componentDidMount() {
    this.handlePageChange(Number(this.props.match.match.params.pathParam || 1));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isMobile !== this.props.isMobile) {
      this.handlePageCounter();
    }
  }

  handlePageCounter = () => {
    this.setState(prevState => ({
      pageCounter: prevState.pageCounter === 5 ? 3 : 5
    }));
  };

  handlePageChange = pageNumber => {
    this.props.getPopular(pageNumber, this.props.api);
    this.props.match.history.push(`/popular/${pageNumber}`);
  };

  render() {
    const { statePopular, api } = this.props;
    return (
      <div className="container">
        {statePopular.isFetched ? (
          <Fragment>
            <h3>
              {statePopular.error
                ? statePopular.error
                : 'Wait a second, content is loading!'}
            </h3>
            {statePopular.error && (
              <button
                className="default-button"
                type="button"
                onClick={() =>
                  this.handlePageChange(
                    this.props.match.match.params.pathParam || 1
                  )
                }
              >
                Try one more time
              </button>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <h2 className="page-description">Popular movies</h2>
            <ul className="main-content">
              {statePopular.displayedMovies.map(movie => (
                <MovieCard
                  className="list-item movie-card"
                  api={api}
                  key={movie.id}
                  movie={movie}
                  favoritesList={this.props.favoritesList}
                  addToFavorites={this.props.addToFavorites}
                  removeFromFavorites={this.props.removeFromFavorites}
                />
              ))}
            </ul>
            <div className="page-buttons">
              {statePopular.allPages > 1 && (
                <Pagination
                  statePopular={statePopular}
                  handlePageChange={this.handlePageChange}
                  pageCounter={this.state.pageCounter}
                />
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
