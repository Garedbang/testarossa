import React, { Fragment } from 'react';

import Pagination from './pagination';
import GetDataError from '../../components/getDataError';
import Movies from './movies';

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
    const { popularData, api } = this.props;
    return (
      <div className="container">
        {popularData.isFetched ? (
          <GetDataError
            error={popularData.error}
            link={this.props.match.match.params.pathParam}
            getData={this.handlePageChange}
            title="Wait a second, content is loading!"
          />
        ) : (
          <Fragment>
            <h2 className="page-description">Popular movies</h2>
            <Movies
              movies={popularData.displayedMovies}
              api={api}
              favoritesList={this.props.favoritesList}
              addToFavorites={this.props.addToFavorites}
              removeFromFavorites={this.props.removeFromFavorites}
              recLineCounter={this.props.recLineCounter}
            />
            {popularData.allPages > 1 && (
              <Pagination
                popularData={popularData}
                handlePageChange={this.handlePageChange}
                pageCounter={this.state.pageCounter}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
