import { ShowMoreButton } from "./components/show-more-button";
import { FilmCard } from "./components/film-card";
import { FilmDetails } from "./components/film-details";
import { Position, render, unrender } from "./utils";

export class PageController {
  constructor(container) {
    this._container = container;
  }

  render(filmsData) {
    // TODO: get topRated and mostCommented

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
      const film = new FilmCard(filmsData[i]);
      const filmDetails = new FilmDetails(filmsData[i]);

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

    render(topFilmsContainer, new FilmCard(filmsData[0]).getElement());
    render(topFilmsContainer, new FilmCard(filmsData[2]).getElement());
    render(commentedFilmsContainer, new FilmCard(filmsData[1]).getElement());
  }
}
