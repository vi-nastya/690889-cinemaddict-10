import { ShowMoreButton } from "./components/show-more-button";
import { FilmCard } from "./components/film-card";
import { FilmDetails } from "./components/film-details";
import { Position, render, unrender, remove } from "./utils";
import { SortType, Sort } from "./components/sort";
import { MovieController } from "./controllers/movie-controller";

const SHOWING_FILMS_COUNT = 5;

// const renderCard = (container, cardData) => {
//   const film = new FilmCard(cardData);
//   const filmDetails = new FilmDetails(cardData);

//   const renderFilmDetails = () => {
//     render(document.querySelector(`body`), filmDetails.getElement());
//     filmDetails.setCloseButtonClickHandler(() => {
//       document.querySelector(`body`).removeChild(filmDetails.getElement());
//     });

//     document.addEventListener(`keydown`, (evt) => {
//       if (evt.keyCode === 27) {
//         document.querySelector(`body`).removeChild(filmDetails.getElement());
//       }
//     });
//   };

//   // add event listeners for FilmCard (open FilmDetails)
//   film.setDetailsOpenClickHandler(renderFilmDetails);

//   render(container, film.getElement(), Position.BEFOREEND);
// };

const renderCards = (container, cardsData, onDataChange) => {
  // cardsData.forEach((card) => renderCard(container, card));
  return cardsData.map((card) => {
    const movieController = new MovieController(container, onDataChange);
    movieController.render(card);
    return movieController;
  });
};

export class PageController {
  constructor(container, filmsData) {
    this._container = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT;
    this._filmsData = filmsData;

    this._renderedCards = [];

    this._sortComponent = new Sort();
    this._noFilmsComponent = null; // TODO
    this._showMoreButtonComponent = new ShowMoreButton();

    // this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    // this._onViewChange = this._onViewChange.bind(this);
    // this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    // this._tasksModel.setFilterChangeHandler(this._onFilterChange);

    this._onDataChange = this._onDataChange.bind(this);
  }

  renderFilms(filmsData) {
    // TODO: get topRated and mostCommented

    render(
      this._container,
      this._sortComponent.getElement(),
      Position.AFTERBEGIN
    );

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

    this._renderedCards = renderCards(filmsContainer, filmsData);

    // TODO: button logic
    render(
      filmsList,
      this._showMoreButtonComponent.getElement(),
      Position.BEFOREEND
    );

    // TODO: get top rated, get most commented
    //renderCards(topFilmsContainer, filmsData.slice(0, 2));
    //renderCards(commentedFilmsContainer, filmsData.slice(2, 4));
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

  _onDataChange(oldFilmData, newFilmData) {
    // TODO call render() from movieController for given data
  }
}
