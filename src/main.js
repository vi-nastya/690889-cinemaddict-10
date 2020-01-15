import { FilmCard } from "./components/film-card";
import { FilmDetails } from "./components/film-details";
import { Search } from "./components/search";
import { Menu } from "./components/menu";
import { Sort } from "./components/sort";
import { ContentContainer } from "./components/content-container";
import { ShowMoreButton } from "./components/show-more-button";
import { films } from "./mocks/films";
import { UserTitle } from "./components/user-title";
import { Position, render, unrender } from "./utils";

const NUM_FILMS = 3;

// calculates data for user stats based on films
// TODO: update and move to utils
const getUserStats = (movies) => {
  return {
    title: `fan`,
    watchlist: 10,
    history: 2,
    favorites: 5
  };
};

const getUserTitle = (movies) => {
  return `fan`;
};

const headerContainer = document.querySelector(`header`);
const mainContainer = document.querySelector(`main`);

render(headerContainer, new Search().getElement(), Position.BEFOREEND);
// TODO: render search
if (films.length > 0) {
  // TODO: render user title
  render(
    headerContainer,
    new UserTitle(getUserTitle(films)).getElement(),
    Position.BEFOREEND
  );
}

// RENDER MAIN SECTION
render(mainContainer, new Menu().getElement(), Position.BEFOREEND);
render(mainContainer, new Sort().getElement(), Position.BEFOREEND);

if (films.length === 0) {
  render(
    mainContainer,
    `There are no movies in our database`,
    Position.BEFOREEND
  );
} else {
  render(
    mainContainer,
    new ContentContainer().getElement(),
    Position.BEFOREEND
  );

  const filmsList = document.querySelectorAll(`.films-list`)[0];

  const filmsContainer = document.querySelectorAll(`.films-list__container`)[0];
  const topFilmsContainer = document.querySelectorAll(
    `.films-list__container`
  )[1];
  const commentedFilmsContainer = document.querySelectorAll(
    `.films-list__container`
  )[2];

  for (let i = 0; i < NUM_FILMS; i++) {
    const film = new FilmCard(films[i]);
    const filmDetails = new FilmDetails(films[i]);

    const renderFilmDetails = () => {
      render(mainContainer, filmDetails.getElement());
      const closeDetailsButton = filmDetails
        .getElement()
        .querySelector(`.film-details__close-btn`);

      closeDetailsButton.addEventListener(`click`, () => {
        mainContainer.removeChild(filmDetails.getElement());
      });

      document.addEventListener(`keydown`, (evt) => {
        if (evt.keyCode === 27) {
          mainContainer.removeChild(filmDetails.getElement());
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

  render(topFilmsContainer, new FilmCard(films[0]).getElement());
  render(topFilmsContainer, new FilmCard(films[2]).getElement());
  render(commentedFilmsContainer, new FilmCard(films[1]).getElement());
  // render details popup
  // render(filmsContainer, new FilmDetails(films[2]).getElement());
}
