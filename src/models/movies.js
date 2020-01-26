export class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = null; // TODO

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getAllMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = movies;
  }

  updateMovie(id, newMovieData) {
    const movieIndex = this._movies.findIndex(
      (movie) => movie.filmData.filmInfo.id === id
    );

    this._movies = [].concat(
      this._movies.slice(0, movieIndex),
      newMovieData,
      this._movies.slice(movieIndex + 1)
    );

    // error handler
  }

  deleteComment(movieId, commentId) {
    const movieIndex = this._movies.findIndex((movie) => movie.id === movieId);
    this._movies[movieIndex].comments = this._movies[movieIndex].comments.filter((comment) => comment.id !== commentId);
  }

  addComment(movieId, commentData) {
    const movieIndex = this._movies.findIndex((movie) => movie.id === movieId);
    // TODO: fix
    this._movies[movieIndex].comments.push(commentData);
  }

  setActiveFilter(newFilter) {
    this._activeFilterType = newFilter;
  }

  getFilteredMovies(filterName) {
    // TODO
  }
}
