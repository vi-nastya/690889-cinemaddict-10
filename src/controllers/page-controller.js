import { ShowMoreButton } from "../components/show-more-button";
import { Position, render, unrender, remove } from "../utils";
import { SortType, Sort } from "../components/sort";
import { MovieController } from "./movie-controller";
import { Films } from "../components/films";

const MovieTypes = {
  RATING: `topRated`,
  COMMENTS: `mostCommented`
};

export const ActionType = {
  ADD: `add`,
  UPDATE: `update`,
  DELETE: `delete`
};

export const ActionObject = {
  MOVIE: `movie`,
  COMMENT: `comment`
};

const NUM_EXTRA_MOVIES = 2;
const SHOWING_FILMS_COUNT = 5;

const getExtaMovies = (movieData, movieType) => {
  switch (movieType) {
    case MovieTypes.RATING: {
      let copyData = [...movieData];
      copyData.sort(
        (m1, m2) => m2.filmInfo.totalRating - m1.filmInfo.totalRating
      );
      return copyData.slice(0, NUM_EXTRA_MOVIES);
    }
    case MovieTypes.COMMENTS: {
      let copyData = [...movieData];
      copyData.sort((m1, m2) => m2.comments.length - m1.comments.length);
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

export class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT;
    this._moviesModel = moviesModel;

    this._renderedCards = [];
    this._renderedTopRated = [];
    this._renderedMostCommented = [];

    this._sortComponent = new Sort();
    this._filmsComponent = new Films();
    this._noFilmsComponent = null; // TODO
    this._showMoreButtonComponent = new ShowMoreButton();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._unrenderFilms = this._unrenderFilms.bind(this);
    // this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    // this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  renderFilms() {
    // TODO: get topRated and mostCommented

    render(this._container, this._sortComponent, Position.AFTERBEGIN);
    render(this._container, this._filmsComponent, Position.BEFOREEND);

    const filmsList = this._container.querySelectorAll(`.films-list`)[0]; // for button

    const filmsContainer = this._container.querySelectorAll(
      `.films-list__container`
    )[0];
    const topFilmsContainer = this._container.querySelectorAll(
      `.films-list__container`
    )[1];
    const commentedFilmsContainer = this._container.querySelectorAll(
      `.films-list__container`
    )[2];

    this._renderedCards = renderCards(
      filmsContainer,
      this._moviesModel.getAllMovies(),
      this._onDataChange,
      this._onViewChange
    );

    // TODO: button logic
    render(filmsList, this._showMoreButtonComponent, Position.BEFOREEND);

    // TODO: get top rated, get most commented
    const topRatedMovies = getExtaMovies(
      this._moviesModel.getAllMovies(),
      MovieTypes.RATING
    );
    const mostCommentedMovies = getExtaMovies(
      this._moviesModel.getAllMovies(),
      MovieTypes.COMMENTS
    );
    this._renderedCards = renderCards(
      topFilmsContainer,
      topRatedMovies,
      this._onDataChange,
      this._onViewChange
    );
    this._renderedCards = renderCards(
      commentedFilmsContainer,
      mostCommentedMovies,
      this._onDataChange,
      this._onViewChange
    );
  }

  _unrenderFilms() {
    this._renderedCards = [];
    this._container.querySelectorAll(
      `.films-list__container`
    )[0].innerHTML = ``;
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._moviesModel.getAllMovies();

    switch (sortType) {
      case SortType.RATING:
        sortedFilms = films
          .slice()
          .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
      case SortType.DATE:
        sortedFilms = films
          .slice()
          .sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        break;
      case SortType.DEFAULT:
        sortedFilms = films.slice(0, this._showingFilmsCount);
        break;
    }

    this._unrenderFilms();
    this.renderFilms(sortedFilms);

    // if (sortType === SortType.DEFAULT) {
    //   this._renderLoadMoreButton();
    // } else {
    //   remove(this._loadMoreButtonComponent);
    // }
  }

  _removeFilms() {
    //this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    //this._showedTaskControllers = [];
  }

  _onDataChange(changeObject, actionType, data) {
    // TODO call render() from movieController for given data
    console.log("ON DATA CHANGE");
    console.log("obj: ", changeObject);
    console.log("type: ", actionType);
    console.log("data: ", data);

    if (changeObject === ActionObject.MOVIE) {
      this._moviesModel.updateMovie(data.id, data);
    } else if (actionType === ActionType.ADD) {
      // TODO: fix (api returns movie object)
      this._moviesModel.addComment(data.movieId, data.commentData);
    } else {
      this._moviesModel.deleteComment(data.movieId, data.commentId);
    }
  }

  _onViewChange() {
    this._renderedCards.forEach((movie) => movie.setDefaultView());
  }

  hide() {
    this._filmsComponent.hide();
    this._sortComponent.hide();
  }

  show() {
    this._container.show();
    this._sortComponent.show();
  }
}
