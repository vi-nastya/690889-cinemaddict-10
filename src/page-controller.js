import { ShowMoreButton } from "./components/show-more-button";
import { FilmCard } from "./components/film-card";
import { FilmDetails } from "./components/film-details";
import { Position, render, unrender, remove } from "./utils";
import { SortType, Sort } from "./components/sort";

const SHOWING_FILMS_COUNT = 5;

export class PageController {
  constructor(container, filmsData) {
    this._container = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT;
    this._filmsData = filmsData;

    this._sortComponent = new Sort();

    // this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    // this._onViewChange = this._onViewChange.bind(this);
    // this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    // this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  renderFilms() {
    // TODO: get topRated and mostCommented

    render(
      this._container,
      this._sortComponent.getElement(),
      Position.AFTERBEGIN
    );

    const NUM_FILMS = 3;

    const filmsList = this._container.querySelectorAll(`.films-list`)[0];

    const filmsContainer = this._container.querySelectorAll(
      `.films-list__container`
    )[0];
    const topFilmsContainer = this._container.querySelectorAll(
      `.films-list__container`
    )[1];
    const commentedFilmsContainer = this._container.querySelectorAll(
      `.films-list__container`
    )[2];

    for (let i = 0; i < NUM_FILMS; i++) {
      const film = new FilmCard(this._filmsData[i]);
      const filmDetails = new FilmDetails(this._filmsData[i]);

      const renderFilmDetails = () => {
        render(this._container, filmDetails.getElement());
        const closeDetailsButton = filmDetails
          .getElement()
          .querySelector(`.film-details__close-btn`);

        closeDetailsButton.addEventListener(`click`, () => {
          this._container.removeChild(filmDetails.getElement());
        });

        this._container.addEventListener(`keydown`, (evt) => {
          if (evt.keyCode === 27) {
            this._container.removeChild(filmDetails.getElement());
          }
        });
      };

      const filmCover = film.getElement().querySelector(`.film-card__poster`);
      const filmTitle = film.getElement().querySelector(`.film-card__title`);
      const filmComments = film
        .getElement()
        .querySelector(`.film-card__comments`);

      filmCover.addEventListener(`click`, renderFilmDetails);
      filmTitle.addEventListener(`click`, renderFilmDetails);
      filmComments.addEventListener(`click`, renderFilmDetails);

      render(filmsContainer, film.getElement(), Position.BEFOREEND);
    }

    // TODO: get top rated, get most commented

    // TODO: condition
    render(filmsList, new ShowMoreButton().getElement(), Position.BEFOREEND);

    render(topFilmsContainer, new FilmCard(this._filmsData[0]).getElement());
    render(topFilmsContainer, new FilmCard(this._filmsData[2]).getElement());
    render(
      commentedFilmsContainer,
      new FilmCard(this._filmsData[1]).getElement()
    );
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._filmsData;

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

    //this._removeFilms();
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
}
