import React, { Fragment } from 'react';

import OptionForList from './optionForList';
import Icon from '../images/search-icon';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      DropDown: false,
      showSearchLine: false
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick);
    this.updateDropDown();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isMobile !== this.props.isMobile) {
      this.updateDropDown(this.props.isMobile)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleGetMovies = () => {
    this.props.getSearch(this.state.query, this.props.api);
  };

  handleChangeQuery = (e) => {
    const value = e.target.value.trim();
    if (value.length > 0 && value[0] !== ' ') {
      this.setState({ query: value, DropDown: true }, () => {
        this.props.handleFixContent(true);
        if (!this.props.isMobile) {
          this.handleGetMovies();
        }
      });
    } else if (value.length === 0) {
      this.hideSearchLine();
    }
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      this.setState({
        DropDown: true
      });
      return;
    }
    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.setState({
      DropDown: false
    });
    this.props.handleFixContent(false);
  };

  keyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleChangeQuery(e);
    }
  };

  showSearchLine = () => {
    this.setState(
      {
        showSearchLine: true
      },
      this.props.handleSearchOpen(this.state.showSearchLine)
    );
  };

  hideSearchLine = () => {
    this.props.setInitialSearch();
    this.setState(
      {
        showSearchLine: !this.props.isMobile,
        query: ''
      },
      this.props.handleSearchOpen(this.state.showSearchLine)
    );
    this.handleClickOutside();
  };

  updateDropDown = (isMobile) => {
    const { showSearchLine } = this.state;
    if (isMobile) {
      if (showSearchLine) {
        this.hideSearchLine();
      }    
    }
    else if (!isMobile) {
      this.showSearchLine();
    }
  };

  render() {
    const { query, showSearchLine, DropDown } = this.state;
    const { className, api, isMobile } = this.props;
    const { movies } = this.props.searchData;
    return (
      <div
        className={showSearchLine ? className : 'show-search'}
        ref={node => {
          this.node = node;
        }}
      >
        {showSearchLine ? (
          <Fragment>
            {isMobile ? (
              <button
                type="button"
                onClick={this.hideSearchLine}
                className="close"
              >
                <div />
              </button>
            ): (<Icon
              className="icon"
              fill='#D6D0D2'
            />)}
            <input
              type="text"
              autoFocus={isMobile}
              placeholder="Enter the name film"
              value={query}
              onChange={this.handleChangeQuery}
              onKeyDown={this.keyPress}
            />
            {showSearchLine && isMobile && (
              <button className='search-button' type="button" onClick={() => this.handleGetMovies()}>
                <Icon fill="#D6D0D2" />
              </button>
            )}
            {DropDown && (
              <div className="drop-down">
                <ul>
                  {movies &&
                    movies.map(movie => (
                      <OptionForList
                        key={movie.id}
                        movie={movie}
                        favoritesList={this.props.favoritesList}
                        removeFromFavorites={this.props.removeFromFavorites}
                        addToFavorites={this.props.addToFavorites}
                        api={api}
                        className="option"
                        hideSearchLine={this.hideSearchLine}
                      />
                    ))}
                </ul>
              </div>
            )}
          </Fragment>
        ) : (
          <div className="show-search">
            <button type="button" onClick={this.showSearchLine}>
              <Icon fill={showSearchLine ? '#D6D0D2' : '#F1E1C7'} />
            </button>
          </div>
        )}
      </div>
    );
  }
}
