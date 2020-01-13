import { getMovieCardMarkup } from "./components/card";
// import {getFiltersMarkup} from './components/filters';
// import {getEditEventFormMarkup} from './components/edit-event-form';
// import {getDaysListMarkup} from './components/days-list';
// import {getDayCardMarkup} from './components/day-card';
// import {getTripInfoMarkup} from './components/trip-info';
// import {getTripSortMarkup} from './components/trip-sort';

// const NUM_CARDS = 3;

const renderComponent = (element, componentMarkup, position = `beforeend`) => {
  element.insertAdjacentHTML(position, componentMarkup);
};

const mainContainer = document.querySelector(`main`);
renderComponent(mainContainer, getMovieCardMarkup);

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
