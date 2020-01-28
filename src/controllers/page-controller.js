import {ShowMoreButton} from "../components/show-more-button";
import {Position, render, unrender, remove} from "../utils";
import {SortType, Sort} from "../components/sort";
import {MovieController} from "./movie-controller";
import {Films} from "../components/films";

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
const NUM_MOVIES_TO_RENDER = 5;

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

export class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._renderedMovies = [];
    this._renderedTopRated = [];
    this._renderedMostCommented = [];

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
    this._unrenderFilms = this._unrenderFilms.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    // this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  renderFilms() {
    render(this._container, this._sortComponent, Position.BEFOREEND);
    render(this._container, this._filmsComponent, Position.BEFOREEND);

    this._allFilmsContainer = this._container.querySelectorAll(
        `.films-list__container`
    )[0];
    this._topRatedContainer = this._container.querySelectorAll(
        `.films-list__container`
    )[1];
    this._mostCommentedContainer = this._container.querySelectorAll(
        `.films-list__container`
    )[2];

    this._renderMovies(this._moviesModel.getAllMovies().slice(0, NUM_MOVIES_TO_RENDER));

    this._renderShowMoreButton();

    // TODO: get top rated, get most commented
    const topRatedMovies = getExtaMovies(
        this._moviesModel.getAllMovies(),
        MovieTypes.RATING
    );
    const mostCommentedMovies = getExtaMovies(
        this._moviesModel.getAllMovies(),
        MovieTypes.COMMENTS
    );
    this._renderedTopRated = renderCards(
        this._topRatedContainer,
        topRatedMovies,
        this._onDataChange,
        this._onViewChange
    );
    this._renderedMostCommented = renderCards(
        this._mostCommentedContainer,
        mostCommentedMovies,
        this._onDataChange,
        this._onViewChange
    );
  }

  _unrenderFilms() {
    this._renderedMovies = [];
    this._allFilmsContainer.innerHTML = ``;
  }

  _renderMovies(moviesData) {
    this._renderedMovies = this._renderedMovies.concat(renderCards(this._allFilmsContainer, moviesData, this._onDataChange, this._onViewChange));

  }

  _renderShowMoreButton() {
    if ((this._sortType !== SortType.DEFAULT) || (this._renderedMovies.length === this._moviesModel.getAllMovies().length)) {
      return;
    }

    render(this._allFilmsContainer, this._showMoreButtonComponent, Position.AFTEREND);
    this._showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);
  }

  _showMoreButtonClickHandler() {
    const numberOfMovies = this._moviesModel.getAllMovies().length;
    const numberOfRenderedMovies = this._renderedMovies.length;
    const numberToRender = Math.min((numberOfMovies - numberOfRenderedMovies), NUM_MOVIES_TO_RENDER);

    if (numberToRender) {
      this._renderMovies(this._moviesModel.getAllMovies().slice(numberOfRenderedMovies, numberOfRenderedMovies + numberToRender));
    }
    if (numberToRender + numberOfRenderedMovies === numberOfMovies) {
      remove(this._showMoreButtonComponent);
    }
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
  }

  _onDataChange(movieController, changeObject, actionType, data) {
    if (changeObject === ActionObject.MOVIE) {
      const oldComments = data.comments;
      this._api.updateMovie(data.id, data).then((response) => {
        const newMovieData = response;
        newMovieData.comments = oldComments;
        this._moviesModel.updateMovie(data.id, newMovieData);
        movieController.render(this._moviesModel.getMovieById(data.id));
        // todo: rerender
      });
    } else if (actionType === ActionType.ADD) {
      this._api.createComment(data.commentData, data.movieId).then((newMovieData) => {
        this._moviesModel.updateMovie(data.movieId, newMovieData);
        movieController.render(this._moviesModel.getMovieById(data.movieId));
        // todo: rerender
      });
    } else {
      this._api.deleteComment(data.commentId).then((response) => {
        this._moviesModel.deleteComment(data.movieId, data.commentId);
        movieController.render(this._moviesModel.getMovieById(data.movieId));
      // todo: rerender
      });
    }
  }

  _onViewChange() {
    this._renderedMovies.forEach((movie) => movie.setDefaultView());
  }

  hide() {
    this._filmsComponent.hide();
    this._sortComponent.hide();
  }

  show() {
    this._filmsComponent.show();
    this._sortComponent.show();
  }
}
