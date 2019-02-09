import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { connect } from 'react-redux';

import {
  addMovieToFavorite,
  removeMovieFromFavorite,
  toggleFavoriteList
} from './redux/actions/favoritesActions';
import getPopular from './redux/actions/popularActions';
import getMovie from './redux/actions/movieActions';
import getSearch, { setInitialSearch } from './redux/actions/searchActions';

import Header from './components/header';
import MoviePage from './pages/movie';
import Popular from './pages/popular';

import './css/normalize.css';
import './css/App.css';

const API_KEY = '3a13c073516ca4288fc8ba31da3eebae';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isContentFixed: false,
      isMobile: false
    };
  }

  componentDidMount() {
    this.handleIsMobile();
    window.addEventListener('resize', this.handleIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleIsMobile);
  }

  handleIsMobile = () => {
    if (window.innerWidth > 850 && this.state.pageCounter !== false) {
      this.setState({ isMobile: false });
    } else if (window.innerWidth < 850 && this.state.pageCounter !== true) {
      this.setState({ isMobile: true });
    }
  };

  handleFixContent = st => {
    if (window.innerWidth < 850) {
      this.setState({
        isContentFixed: st
      });
    }
  };

  render() {
    const { favoritesList } = this.props;
    return (
      <div className={this.state.isContentFixed ? 'App fix-content' : 'App'}>
        <Router>
          <LastLocationProvider>
            <Fragment>
              <Header
                favoritesList={favoritesList.list}
                api={API_KEY}
                removeFromFavorites={this.props.removeMovieFromFavorite}
                addToFavorites={this.props.addMovieToFavorite}
                showFavoriteList={favoritesList.showFavoriteList}
                toggleFavoriteList={toggleFavoriteList}
                handleFixContent={this.handleFixContent}
                getSearch={this.props.getSearch}
                searchData={this.props.searchData}
                setInitialSearch={this.props.setInitialSearch}
                isMobile={this.state.isMobile}
              />
              <Switch>
                <Route
                  exact
                  path="/popular/:pathParam?"
                  render={match => (
                    <Popular
                      api={API_KEY}
                      match={match}
                      favoritesList={favoritesList.list}
                      addToFavorites={this.props.addMovieToFavorite}
                      removeFromFavorites={this.props.removeMovieFromFavorite}
                      getPopular={this.props.getPopular}
                      statePopular={this.props.popular}
                      isMobile={this.state.isMobile}
                    />
                  )}
                />
                <Route
                  path="/movie/:pathParam?"
                  render={match => (
                    <MoviePage
                      api={API_KEY}
                      match={match}
                      favoritesList={favoritesList.list}
                      addToFavorites={this.props.addMovieToFavorite}
                      removeFromFavorites={this.props.removeMovieFromFavorite}
                      getMovie={this.props.getMovie}
                      movie={this.props.movie}
                      currentPopularPage={this.props.popular.currentPage}
                    />
                  )}
                />
                <Redirect from="/" to="/popular/1" />
              </Switch>
            </Fragment>
          </LastLocationProvider>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favoritesList: state.favoritesReducer,
  popular: state.popularReducer,
  movie: state.movieReducer,
  searchData: state.searchReducer
});
const mapDispatchToProps = dispatch => ({
  addMovieToFavorite: movie => dispatch(addMovieToFavorite(movie)),
  removeMovieFromFavorite: id => dispatch(removeMovieFromFavorite(id)),
  toggleFavoriteList: () => dispatch(toggleFavoriteList()),
  getPopular: (page, api) => dispatch(getPopular(page, api)),
  getMovie: (id, api) => dispatch(getMovie(id, api)),
  getSearch: (query, api) => dispatch(getSearch(query, api)),
  setInitialSearch: () => dispatch(setInitialSearch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
