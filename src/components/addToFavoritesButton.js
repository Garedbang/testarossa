import React from 'react';

import isMovieInFavorite from './isMovieInFavoriteList';
import Icon from '../images/favorite-icon';

export default class AddToFavoriteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultButtonActive: false,
      isMoviePage: props.isMoviePage || false
    };
  }

  componentDidMount() {
    this.isMovieInFavorite(this.props.movie.id);
  }

  componentDidUpdate(prevProps) {
    const {favoritesList,movie} = this.props
    if (favoritesList !== prevProps.favoritesList || movie.id !== prevProps.movie.id) {
      this.isMovieInFavorite(movie.id);
    }
  }

  isMovieInFavorite = (id) => {
    this.setState({
      defaultButtonActive: isMovieInFavorite(id, this.props.favoritesList)
    });
  };

  handleFavoriteClick = (movie) => {
    const {removeFromFavorites, addToFavorites, favoritesList} = this.props
    if (isMovieInFavorite(movie.id, favoritesList)) {
      removeFromFavorites(movie.id);
      this.setState({ defaultButtonActive: false });
    } else {
      addToFavorites(movie);
      this.setState({ defaultButtonActive: true });
    }
  };

  render() {
    const { movie } = this.props;
    const { defaultButtonActive, isMoviePage } = this.state;
    return (
      <button
        type='button'
        className="favorite-button"
        onClick={() => this.handleFavoriteClick(movie)}
      >
        <Icon color="#EC5A0F" fill={defaultButtonActive} />
        {isMoviePage &&
          (defaultButtonActive
            ? 'Remove from favorite page'
            : 'Add to favorite page')}
      </button>
    );
  }
}
