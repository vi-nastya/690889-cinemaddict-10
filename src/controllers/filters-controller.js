import {Filters, FilterType} from "../components/filters";
import {render, Position} from "../utils";

export class FiltersController {
  constructor(container, moviesModel) {
    this._contaiter = container;
    this._moviesModel = moviesModel;
    this._filtersComponent = null;
    this._screenChangeHandler = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    this._filtersComponent = new Filters(FilterType.ALL, this._moviesModel.getAllMovies());
    console.log(this._filtersComponent);
    // TODO
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._contaiter, this._filtersComponent, Position.AFTERBEGIN);
  }

  setScreenChangeHandler(handler) {
    this._screenChangeHandler = handler;
  }

  _onFilterChange(newFilterType) {
    // TODO: update model
    // TODO: call screen change handler
    this._screenChangeHandler(newFilterType);
  }
}
