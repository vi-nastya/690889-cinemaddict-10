import AbstractComponent from "./abstract-component";
import {FilterType, ElementClass} from "../constants";

const getFiltersMarkup = (moviesData, activeFilter) => {
  let moviesWatched = 0;
  let moviesWatchlist = 0;
  let moviesFavorite = 0;
  for (let movie of moviesData) {
    if (movie.userDetails.alreadyWatched) {
      moviesWatched++;
    }
    if (movie.userDetails.watchlist) {
      moviesWatchlist++;
    }
    if (movie.userDetails.favorite) {
      moviesFavorite++;
    }
  }
  return `<nav class="main-navigation">
    <a href="#all" data-filter-type="${FilterType.ALL}"
    class="main-navigation__item ${activeFilter === FilterType.ALL ? `main-navigation__item--active` : ``}">
      All movies
    </a>
    <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item"
    ${activeFilter === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}>
      Watchlist <span class="main-navigation__item-count">${moviesWatchlist}</span>
    </a>
    <a href="#history" data-filter-type="${FilterType.WATCHED}" class="main-navigation__item"
    ${activeFilter === FilterType.WATCHED ? `main-navigation__item--active` : ``}>
      History <span class="main-navigation__item-count">${moviesWatched}</span>
    </a>
    <a href="#favorites" data-filter-type="${FilterType.FAVORITE}" class="main-navigation__item"
    ${activeFilter === FilterType.FAVORITE ? `main-navigation__item--active` : ``}>
      Favorites <span class="main-navigation__item-count">${moviesFavorite}</span>
    </a>
    <a href="#stats" data-filter-type="${FilterType.STATS}" class="main-navigation__item main-navigation__item--additional"
    ${activeFilter === FilterType.STATS ? `main-navigation__item--active` : ``}>
      Stats
    </a>
  </nav>`;
};

export default class Filters extends AbstractComponent {
  constructor(currentFilter, moviesData) {
    super();
    this._movies = moviesData;
    this._currentFilter = currentFilter;
  }

  getTemplate() {
    return getFiltersMarkup(this._movies, this._currentFilter);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const newFilter = evt.target.dataset.filterType;
      if (newFilter === this._currentFilter) {
        return;
      }

      this._currentFilter = newFilter;

      // update active element:
      const currentActiveFilterElement = this.getElement().querySelector(`.${ElementClass.ACTIVE_FILTER}`);
      currentActiveFilterElement.classList.remove(ElementClass.ACTIVE_FILTER);
      evt.target.classList.add(ElementClass.ACTIVE_FILTER);

      handler(this._currentFilter);
    });
  }
}
