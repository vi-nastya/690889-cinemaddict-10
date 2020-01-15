import { FilmCard } from "./components/film-card";
import { FilmDetails } from "./components/film-details";
import { Search } from "./components/search";
import { Menu } from "./components/menu";
import { Sort } from "./components/sort";
import { ContentContainer } from "./components/content-container";
import { ShowMoreButton } from "./components/show-more-button";
import { films } from "./mocks/films";
import { UserTitle } from "./components/user-title";
import { Position, render } from "./utils";

const NUM_FILMS = 5;

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
render(mainContainer, new ContentContainer().getElement(), Position.BEFOREEND);

const filmsList = document.querySelectorAll(`.films-list`)[0];
const filmsContainer = document.querySelectorAll(`.films-list__container`)[0];
const topFilmsContainer = document.querySelectorAll(
  `.films-list__container`
)[1];
const commentedFilmsContainer = document.querySelectorAll(
  `.films-list__container`
)[2];

render(filmsContainer, new FilmCard(films[0]).getElement(), Position.BEFOREEND);
render(filmsContainer, new FilmCard(films[1]).getElement(), Position.BEFOREEND);

// TODO: condition
render(filmsList, new ShowMoreButton().getElement(), Position.BEFOREEND);

// render details popup
// render(filmsContainer, new FilmDetails(films[2]).getElement());
