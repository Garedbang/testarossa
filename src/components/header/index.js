import React from 'react';
import { NavLink } from 'react-router-dom';

import Search from './search';
import Favorites from './favorites';
import logo from '../../images/logo.svg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchClosed: true
    };
  }

  componentDidMount() {
    this.handleSearchOpen(this.props.isMobile);
  }

  handleSearchOpen = st => {
    this.setState({
      isSearchClosed: this.props.isMobile ? st : true
    });
  };

  render() {
    const { isSearchClosed } = this.state;
    const {
      api,
      favoritesList,
      removeFromFavorites,
      handleFixContent
    } = this.props;
    return (
      <header className="container">
        {isSearchClosed && (
          <div className="logo">
            <NavLink to="/popular/1">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
        )}
        <Search
          className="search"
          api={api}
          favoritesList={favoritesList}
          removeFromFavorites={removeFromFavorites}
          addToFavorites={this.props.addToFavorites}
          handleSearchOpen={this.handleSearchOpen}
          handleFixContent={handleFixContent}
          getSearch={this.props.getSearch}
          searchData={this.props.searchData}
          setInitialSearch={this.props.setInitialSearch}
          isMobile={this.props.isMobile}
        />
        {isSearchClosed && (
          <div className="favorite">
            <Favorites
              api={api}
              favoritesList={favoritesList}
              removeFromFavorites={removeFromFavorites}
              toggleFavoriteList={this.props.toggleFavoriteList}
              handleFixContent={handleFixContent}
            />
          </div>
        )}
      </header>
    );
  }
}
