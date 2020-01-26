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
    console.log("DEL COMMENT ", movieId, commentId);
    const movieIndex = this._movies.findIndex((movie) => movie.id === movieId);
    console.log("BEFORE DEL: ", this._movies[movieIndex]);
    this._movies[movieIndex].comments = this._movies[movieIndex].comments.filter((comment) => comment.id !== commentId);
    console.log("AFTER DEL: ", this._movies[movieIndex]);
  }

  setActiveFilter(newFilter) {
    this._activeFilterType = newFilter;
  }

  getFilteredMovies(filterName) {
    // TODO
  }
}
