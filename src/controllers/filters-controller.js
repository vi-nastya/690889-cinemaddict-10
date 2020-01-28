import {Filters, FilterType} from "../components/filters";
import {render, Position, replace} from "../utils";

export class FiltersController {
  constructor(container, moviesModel) {
    this._contaiter = container;
    this._moviesModel = moviesModel;
    this._filtersComponent = null;
    this._screenChangeHandler = null;

    this._onFilterChange = this._onFilterChange.bind(this);

    this._dataChangeHandler = this._dataChangeHandler.bind(this);

    this._moviesModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const prevComponent = this._filtersComponent;

    this._filtersComponent = new Filters(FilterType.ALL, this._moviesModel.getAllMovies());
    // TODO
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);
    if (prevComponent) {
      replace(this._filtersComponent, prevComponent);
    } else {
      render(this._contaiter, this._filtersComponent, Position.AFTERBEGIN);
    }
  }

  setScreenChangeHandler(handler) {
    this._screenChangeHandler = handler;
  }

  _onFilterChange(newFilterType) {
    // TODO: update model
    // TODO: call screen change handler
    this._screenChangeHandler(newFilterType);
    this._moviesModel.setActiveFilter = newFilterType;
  }

  _dataChangeHandler() {
    this.render();
  }
}
