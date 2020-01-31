import ShowMoreButton from "../components/show-more-button";
import {Position, render, remove, getUserRank} from "../utils";
import Sort from "../components/sort";
import MovieController from "./movie-controller";
import Films from "../components/films";
import EmptyMoviesList from "../components/empty-movies-list";
import UserRank from "../components/user-rank";
import {SortType, NUM_EXTRA_MOVIES, NUM_MOVIES_TO_RENDER, ActionType, ActionObject, VISUALLY_HIDDEN_CLASS, ExtraType} from "../constants";

const getExtaMovies = (movieData, movieType) => {
  switch (movieType) {
    case ExtraType.TOP_RATED: {
      let copyData = [...movieData];
      copyData.sort(
          (m1, m2) => m2.filmInfo.totalRating - m1.filmInfo.totalRating
      );
      if (copyData[0].filmInfo.totalRating === 0) {
        return [];
      }
      return copyData.slice(0, NUM_EXTRA_MOVIES);
    }
    case ExtraType.MOST_COMMENTED: {
      let copyData = [...movieData];
      copyData.sort((m1, m2) => m2.comments.length - m1.comments.length);

      // return empty if all movies have 0 comments
      if (copyData[0].comments.length === 0) {
        return [];
      }
      return copyData.slice(0, NUM_EXTRA_MOVIES);
    }
  }
  return [];
};

const renderCards = (container, cardsData, onDataChange, onViewChange) => {
  return cardsData.map((card) => {
    const movieController = new MovieController(
        container,
        onDataChange,
        onViewChange
    );
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._renderedMovies = [];
    this._renderedTopRated = [];
    this._renderedMostCommented = [];

    this._userRankComponent = new UserRank();

    this._sortType = SortType.DEFAULT;

    this._sortComponent = new Sort();
    this._filmsComponent = new Films();
    this._noFilmsComponent = null; // TODO
    this._showMoreButtonComponent = new ShowMoreButton();

    this._allFilmsContainer = null;
    this._topRatedContainer = null;
    this._mostCommentedContainer = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._unrenderMovies = this._unrenderMovies.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

    this._emptyMoviesComponent = new EmptyMoviesList();
  }

  hide() {
    this._filmsComponent.hide();
    this._sortComponent.hide();
  }

  show() {
    this._filmsComponent.show();
    this._sortComponent.show();
  }

  render() {
    const movies = this._moviesModel.getMovies();
    if (!movies.length) {
      render(this._container, this._emptyMoviesComponent);
      return;
    }
    this._renderUserRank(movies);
    render(this._container, this._sortComponent, Position.BEFOREEND);
    render(this._container, this._filmsComponent, Position.BEFOREEND);

    this._allFilmsContainer = this._container.querySelectorAll(`.films-list__container`)[0];
    this._topRatedContainer = this._container.querySelectorAll(`.films-list__container`)[1];
    this._mostCommentedContainer = this._container.querySelectorAll(`.films-list__container`)[2];

    this._renderMovies(movies.slice(0, NUM_MOVIES_TO_RENDER));

    this._renderShowMoreButton();

    const topRatedMovies = getExtaMovies(movies, ExtraType.TOP_RATED);
    const mostCommentedMovies = getExtaMovies(movies, ExtraType.MOST_COMMENTED);

    if (!topRatedMovies.length) {
      this._container.querySelector(`section[data-extra-type="${ExtraType.TOP_RATED}"]`)
        .classList.add(VISUALLY_HIDDEN_CLASS);
      this._renderedTopRated = [];
    } else {
      this._renderedTopRated = renderCards(this._topRatedContainer, topRatedMovies, this._onDataChange, this._onViewChange);
    }

    if (!mostCommentedMovies.length) {
      this._container.querySelector(`section[data-extra-type="${ExtraType.MOST_COMMENTED}"]`)
        .classList.add(VISUALLY_HIDDEN_CLASS);
      this._renderedMostCommented = [];
    } else {
      this._renderedMostCommented = renderCards(this._mostCommentedContainer, mostCommentedMovies, this._onDataChange, this._onViewChange);
    }
  }

  _updateMovies() {
    const newMovies = this._moviesModel.getMovies();
    this._unrenderMovies();
    this._renderUserRank(newMovies);
    this._onSortTypeChange(this._sortType);
    this._renderExtraMovies(newMovies);
  }

  _renderUserRank(movies) {
    remove(this._userRankComponent);
    const userRank = getUserRank(movies);
    if (userRank) {
      this._userRankComponent.setRank(userRank);
      render(document.querySelector(`header`), this._userRankComponent, Position.BEFOREEND);
    }
  }

  _unrenderMovies() {
    this._renderedMovies = [];
    this._allFilmsContainer.innerHTML = ``;
    remove(this._showMoreButtonComponent);
  }

  _renderMovies(moviesData) {
    if (!moviesData.length) {
      return;
    }
    this._renderedMovies = this._renderedMovies.concat(renderCards(this._allFilmsContainer, moviesData, this._onDataChange, this._onViewChange));
    return;
  }

  _renderExtraMovies(moviesData) {
    // remove old cards
    this._topRatedContainer.innerHTML = ``;
    this._container.querySelector(`section[data-extra-type="${ExtraType.TOP_RATED}"]`)
        .classList.remove(VISUALLY_HIDDEN_CLASS);
    this._mostCommentedContainer.innerHTML = ``;
    this._container.querySelector(`section[data-extra-type="${ExtraType.MOST_COMMENTED}"]`)
        .classList.remove(VISUALLY_HIDDEN_CLASS);

    // get new data
    const topRatedMovies = getExtaMovies(moviesData, ExtraType.TOP_RATED);
    const mostCommentedMovies = getExtaMovies(moviesData, ExtraType.MOST_COMMENTED);

    // render new cards or hide sections
    if (!topRatedMovies.length) {
      this._container.querySelector(`section[data-extra-type="${ExtraType.TOP_RATED}"]`)
        .classList.add(VISUALLY_HIDDEN_CLASS);
      this._renderedTopRated = [];
    } else {
      this._renderedTopRated = renderCards(this._topRatedContainer, topRatedMovies, this._onDataChange, this._onViewChange);
    }

    if (!mostCommentedMovies.length) {
      this._container.querySelector(`section[data-extra-type="${ExtraType.MOST_COMMENTED}"]`)
        .classList.add(VISUALLY_HIDDEN_CLASS);
      this._renderedMostCommented = [];
    } else {
      this._renderedMostCommented = renderCards(this._mostCommentedContainer, mostCommentedMovies, this._onDataChange, this._onViewChange);
    }
  }

  _renderShowMoreButton() {
    if ((this._sortType !== SortType.DEFAULT) || (this._renderedMovies.length === this._moviesModel.getMovies().length)) {
      return;
    }
    render(this._allFilmsContainer, this._showMoreButtonComponent, Position.AFTEREND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const numberOfMovies = this._moviesModel.getMovies().length;
    const numberOfRenderedMovies = this._renderedMovies.length;
    const numberToRender = Math.min((numberOfMovies - numberOfRenderedMovies), NUM_MOVIES_TO_RENDER);

    if (numberToRender) {
      this._renderMovies(this._moviesModel.getMovies().slice(numberOfRenderedMovies, numberOfRenderedMovies + numberToRender));
    }
    if (numberToRender + numberOfRenderedMovies === numberOfMovies) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
  // set sort type fo Default
    this._sortComponent.resetSortType();
    this._onSortTypeChange(SortType.DEFAULT);
  }

  _onSortTypeChange(sortType) {
    const movies = this._moviesModel.getMovies();

    this._sortType = sortType;

    switch (sortType) {
      case SortType.RATING:
        this._unrenderMovies();
        this._renderMovies(movies
          .slice()
          .sort((a, b) => Number(b.filmInfo.totalRating) - Number(a.filmInfo.totalRating)));
        break;
      case SortType.DATE:
        this._unrenderMovies();
        this._renderMovies(movies
          .slice()
          .sort((a, b) => Date.parse(b.filmInfo.release.date) - Date.parse(a.filmInfo.release.date)));
        break;
      case SortType.DEFAULT:
        this._unrenderMovies();
        this._renderMovies(movies.slice(0, NUM_MOVIES_TO_RENDER));
        this._renderShowMoreButton();
    }
  }

  _onDataChange(movieController, changeObject, actionType, data) {
    if (changeObject === ActionObject.MOVIE) {
      const oldComments = data.comments;
      this._api.updateMovie(data.id, data).then((response) => {
        const newMovieData = response;
        newMovieData.comments = oldComments;
        this._moviesModel.updateMovie(data.id, newMovieData);
        movieController.render(this._moviesModel.getMovieById(data.id));

        this._updateMovies();
      });
    } else if (actionType === ActionType.ADD) {
      this._api.createComment(data.commentData, data.movieId)
      .then((newMovieData) => {
        this._moviesModel.updateMovie(data.movieId, newMovieData);
        movieController.render(this._moviesModel.getMovieById(data.movieId));

        this._updateMovies();
      })
      .catch(() => {
        movieController.handleAddCommentError();
      });
    } else {
      this._api.deleteComment(data.commentId)
      .then(() => {
        this._moviesModel.deleteComment(data.movieId, data.commentId);
        movieController.render(this._moviesModel.getMovieById(data.movieId));

        this._updateMovies();
      })
      .catch(() => {
        movieController.handleDeleteError();
      });
    }
  }

  _onViewChange() {
    this._renderedMovies.forEach((movie) => movie.setDefaultView());
  }
}
