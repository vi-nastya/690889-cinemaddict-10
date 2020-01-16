import { AbstractComponent } from "../utils";

export const SortType = {
  RATING: `rating`,
  DATE: `date`,
  DEFAULT: `default`
};

export class Sort extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT} class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE} class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING} class="sort__button">Sort by rating</a></li>
  </ul>`;
  }
}
