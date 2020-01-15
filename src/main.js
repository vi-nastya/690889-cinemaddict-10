import { FilmCard } from "./components/film-card";
import { films } from "./mocks/films";
import { UserTitle } from "./components/user-title";
// import {getFiltersMarkup} from './components/filters';
// import {getEditEventFormMarkup} from './components/edit-event-form';
// import {getDaysListMarkup} from './components/days-list';
// import {getDayCardMarkup} from './components/day-card';
// import {getTripInfoMarkup} from './components/trip-info';
// import {getTripSortMarkup} from './components/trip-sort';

// const NUM_CARDS = 3;

// calculates data for user stats based on films
// TODO: update and move to utils
const getUserTitle = (movies) => {
  return {
    title: `fan`,
    watchlist: 10,
    history: 2,
    favorites: 5
  };
};

const renderComponent = (element, componentMarkup, position = `beforeend`) => {
  element.insertAdjacentHTML(position, componentMarkup);
};
const headerContainer = document.querySelector(`header`);
// TODO: render search
if (films.length > 0) {
  // TODO: render user title
}

const mainContainer = document.querySelector(`main`);
renderComponent(mainContainer, new FilmCard(films[0]).getTemplate());

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
