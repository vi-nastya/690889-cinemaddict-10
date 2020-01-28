import {FilterType} from "../components/filters";

export class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL; // TODO

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getAllMovies() {
    return this._movies;
  }

  getMovies() {
    switch (this._activeFilterType) {
      case FilterType.ALL:
        return this._movies;
      case FilterType.WATCHED:
        return this._movies.filter((movie) => (movie.userDetails.alreadyWatched));
      case FilterType.FAVORITE:
        return this._movies.filter((movie) => (movie.userDetails.favorite));
      case FilterType.WATCHLIST:
        return this._movies.filter((movie) => (movie.userDetails.watchlist));
    }
    return this._movies;
  }

  getMovieById(movieId) {
    return this._movies.find((movie) => movie.id === movieId) || null;
  }

  setMovies(movies) {
    this._movies = movies;
  }

  updateMovie(id, newMovieData) {
    const movieIndex = this._movies.findIndex((movie) => movie.id === id);
    this._movies[movieIndex] = newMovieData;

    this._activateHandlers(this._dataChangeHandlers);
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
    this._activateHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _activateHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
