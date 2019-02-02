import React, { Fragment } from 'react';

import MovieCard from './movieCard';
import Pagination from './pagination';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCounter: 5
    };
  }

  componentDidMount() {
    this.handlePageChange(
      Number(this.props.match.match.url.split('/')[2]) || 1
    );
  }

  componentDidUpdate(prevProps) {

    if (prevProps.isMobile !== this.props.isMobile) {
      const count = this.state.pageCounter === 5 ? 3 : 5
      this.setState({pageCounter: count})
    }
  }

  handlePageChange = pageNumber => {
    this.props.getPopular(pageNumber, this.props.api);
    this.props.match.history.push(`/popular/${pageNumber}`);
  };

  render() {
    const { statePopular, api } = this.props;
    return (
      <div className="container">
        {statePopular.isFetched ? (
          <h3>Wait a second, content is loading!</h3>
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
