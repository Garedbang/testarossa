export default function isMovieInFavorite (id, list) {
    return list.filter((movie) => id === movie.id).length > 0
}
