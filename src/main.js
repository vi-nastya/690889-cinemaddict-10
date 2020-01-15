import { FilmCard } from "./components/film-card";
import { Search } from "./components/search";
import { Menu } from "./components/menu";
import { Sort } from "./components/sort";
import { ContentContainer } from "./components/content-container";
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

const filmsContainer = document.querySelectorAll(`.films-list__container`)[0];
const topFilmsContainer = document.querySelectorAll(
  `.films-list__container`
)[1];
const commentedFilmsContainer = document.querySelectorAll(
  `.films-list__container`
)[2];

render(filmsContainer, new FilmCard(films[0]).getElement(), Position.BEFOREEND);
render(filmsContainer, new FilmCard(films[1]).getElement(), Position.BEFOREEND);

// const renderCards = (element, numCardsToRender) => {
//   for (let i = 0; i < numCardsToRender; i++) {
//     renderComponent(element, getDayCardMarkup());
//   }
// };

// const tripInfoContainer = document.querySelector(`.trip-info`);
// const menuHeader = document.querySelector(`.trip-controls h2`);
// const filtersHeader = document.querySelectorAll(`.trip-controls h2`)[1];
// const tripEventsContainer = document.querySelector(`.trip-events`);

// renderComponent(tripInfoContainer, getTripInfoMarkup(), `afterbegin`);
// renderComponent(menuHeader, getMenuMarkup(), `afterend`);
// renderComponent(filtersHeader, getFiltersMarkup(), `afterend`);
// renderComponent(tripEventsContainer, getTripSortMarkup());
// renderComponent(tripEventsContainer, getEditEventFormMarkup());
// renderComponent(tripEventsContainer, getDaysListMarkup());

// const daysContainer = document.querySelector(`.trip-days`);
// renderCards(daysContainer, NUM_CARDS);
