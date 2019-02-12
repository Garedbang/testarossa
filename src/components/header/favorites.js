import React from 'react';

import OptionForList from './optionForList';
import Icon from '../../images/favorite-icon';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DropDown: false
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.clickOutside();
  };

  showFavorite = e => {
    e.stopPropagation();
    this.setState(
      prevState => ({
        DropDown: !prevState.DropDown
      }),
      () => {
        if (this.state.DropDown) {
          this.props.handleFixContent(true);
        } else {
          this.clickOutside();
        }
      }
    );
  };

  clickOutside = () => {
    this.setState({
      DropDown: false
    });
    this.props.handleFixContent(false);
  };

  render() {
    const { DropDown } = this.state;
    const { favoritesList, api } = this.props;
    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        <button
          type="button"
          className="favorite-list"
          onClick={this.showFavorite}
        >
          <Icon color="#F1E1C7" fill={DropDown} />
        </button>
        {DropDown && (
          <div className="drop-down">
            {favoritesList.length > 0 ? (
              <ul>
                {favoritesList.map(movie => (
                  <OptionForList
                    key={movie.id}
                    movie={movie}
                    favoritesList={this.props.favoritesList}
                    removeFromFavorites={this.props.removeFromFavorites}
                    api={api}
                    className="option"
                    hideDropDown={this.clickOutside}
                  />
                ))}
              </ul>
            ) : (
              <h4>Your favorite movies list empty, try to add something!</h4>
            )}
          </div>
        )}
      </div>
    );
  }
}
