import Filters from "../components/filters";
import {FilterType} from "../constants";
import {render, Position, replace} from "../utils";

export default class FiltersController {
  constructor(container, moviesModel) {
    this._contaiter = container;
    this._moviesModel = moviesModel;
    this._filtersComponent = null;
    this._onScreenChange = null;

    this._onFilterChange = this._onFilterChange.bind(this);

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const prevComponent = this._filtersComponent;

    this._filtersComponent = new Filters(FilterType.ALL, this._moviesModel.getAllMovies());
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);

    if (prevComponent) {
      replace(this._filtersComponent, prevComponent);
    } else {
      render(this._contaiter, this._filtersComponent, Position.AFTERBEGIN);
    }
  }

  setScreenChangeHandler(handler) {
    this._onScreenChange = handler;
  }

  _onFilterChange(newFilterType) {
    this._onScreenChange(newFilterType);
    this._moviesModel.setActiveFilter(newFilterType);
  }

  _onDataChange() {
    this.render();
  }
}
