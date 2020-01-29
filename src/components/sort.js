import AbstractComponent from "./abstract-component";
import {SortType} from "../constants";
export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this.getElement()
        .querySelector(`.sort__button--active`)
        .classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);
      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }

  resetSortType() {
    if (this._currenSortType === SortType.DEFAULT) {
      return;
    }
    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    this.getElement().querySelector(`a[data-sort-type=${SortType.DEFAULT}]`).classList.add(`sort__button--active`);
    this._currenSortType = SortType.DEFAULT;
  }
}
