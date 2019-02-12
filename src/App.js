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
  removeMovieFromFavorite
} from './redux/actions/favoritesActions';
import getPopular from './redux/actions/popularActions';
import getMovie from './redux/actions/movieActions';
import getSearch, { setInitialSearch } from './redux/actions/searchActions';

import Header from './components/header/index';
import MoviePage from './pages/movie/index';
import Popular from './pages/popular/index';

import './css/normalize.css';
import './css/App.css';

const API_KEY = '3a13c073516ca4288fc8ba31da3eebae';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isContentFixed: false,
      isMobile: false,
      recLineCounter: 0
    };
  }

  componentDidMount() {
    this.handleIsMobile();
    this.updaterecLineCounter();
    window.addEventListener('resize', this.handleIsMobile);
    window.addEventListener('resize', this.updaterecLineCounter);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleIsMobile);
    window.removeEventListener('resize', this.updaterecLineCounter);
  }

  handleIsMobile = () => {
    if (window.innerWidth > 850 && this.state.pageCounter !== false) {
      this.setState({ isMobile: false });
    } else if (window.innerWidth < 850 && this.state.pageCounter !== true) {
      this.setState({ isMobile: true });
    }
  };

  updaterecLineCounter = () => {
    const { recLineCounter } = this.state;
    if (window.innerWidth < 400) {
      if (recLineCounter !== 1) {
        this.setState({
          recLineCounter: 1
        });
      }
    } else if (window.innerWidth < 454) {
      if (recLineCounter !== 4) {
        this.setState({
          recLineCounter: 4
        });
      }
    } else if (window.innerWidth < 545) {
      if (recLineCounter !== 5) {
        this.setState({
          recLineCounter: 5
        });
      }
    } else if (window.innerWidth < 850) {
      if (recLineCounter !== 6) {
        this.setState({
          recLineCounter: 6
        });
      }
    } else if (window.innerWidth < 1400) {
      if (recLineCounter !== 5) {
        this.setState({
          recLineCounter: 5
        });
      }
    } else if (window.innerWidth < 1600) {
      if (recLineCounter !== 6) {
        this.setState({
          recLineCounter: 6
        });
      }
    } else if (window.innerWidth < 1800) {
      if (recLineCounter !== 9) {
        this.setState({
          recLineCounter: 9
        });
      }
    } else if (window.innerWidth > 1800) {
      if (recLineCounter !== 11) {
        this.setState({
          recLineCounter: 11
        });
      }
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
                api={API_KEY}
                favoritesList={favoritesList.list}
                removeFromFavorites={this.props.removeMovieFromFavorite}
                addToFavorites={this.props.addMovieToFavorite}
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
                      popularData={this.props.popular}
                      isMobile={this.state.isMobile}
                      recLineCounter={this.state.recLineCounter}
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
                      recLineCounter={this.state.recLineCounter}
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
  getPopular: (page, api) => dispatch(getPopular(page, api)),
  getMovie: (id, api) => dispatch(getMovie(id, api)),
  getSearch: (query, api) => dispatch(getSearch(query, api)),
  setInitialSearch: () => dispatch(setInitialSearch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
