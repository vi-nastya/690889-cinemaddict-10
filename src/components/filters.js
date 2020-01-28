import {AbstractComponent} from "../utils";

export const FilterType = {
  DEFAULT: `all`,
  STATS: `stats`,
  WATCHED: `watched`,
  WATCHLIST: `watchlist`,
  FAVORITE: `favorite`
};

const ACTIVE_FILTER_CLASS = `main-navigation__item--active`;

export class Filters extends AbstractComponent {
  constructor(currentFilter) {
    super();

    this._currentFilter = currentFilter;
  }

  getTemplate() {
    // TODO: mark active
    return `<nav class="main-navigation">
    <a href="#all" data-filter-type="${FilterType.DEFAULT}" class="main-navigation__item ${this._currentFilter === FilterType.DEFAULT ? `main-navigation__item--active` : ``}">All movies</a>
    <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item" ${this._currentFilter === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}>Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" data-filter-type="${FilterType.WATCHED}" class="main-navigation__item" ${this._currentFilter === FilterType.WATCHED ? `main-navigation__item--active` : ``}>History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" data-filter-type="${FilterType.FAVORITE}" class="main-navigation__item" ${this._currentFilter === FilterType.FAVORITE ? `main-navigation__item--active` : ``}>Favorites <span class="main-navigation__item-count">8</span></a>
    <a href="#stats" data-filter-type="${FilterType.STATS}" class="main-navigation__item main-navigation__item--additional" ${this._currentFilter === FilterType.STATS ? `main-navigation__item--active` : ``}>Stats</a>
  </nav>`;
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
      const currentActiveFilterElement = this.getElement().querySelector(`.${ACTIVE_FILTER_CLASS}`);
      currentActiveFilterElement.classList.remove(ACTIVE_FILTER_CLASS);
      evt.target.classList.add(ACTIVE_FILTER_CLASS);

      handler(this._currentFilter);
    });
  }
}
