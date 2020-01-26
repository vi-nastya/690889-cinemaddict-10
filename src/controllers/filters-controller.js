import {Filters} from "../components/filters";
import {render, Position} from "../utils";

export class FiltersController {
  constructor(container, moviesModel) {
    this._contaiter = container;
    this._moviesModel = moviesModel;
    this._filtersComponent = new Filters();
    this._screenChangeHandler = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    // TODO
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._contaiter, this._filtersComponent, Position.AFTERBEGIN);
  }

  getFiltersCount() {
    const moviesData = this._moviesModel.getAllMovies();
    const watched = moviesData.filter((movie) => movie.userDetails.alreadyWatched).length;
    const watchlist = moviesData.filter((movie) => movie.userDetails.watchlist).length;
    const favorite = moviesData.filter((movie) => movie.userDetails.favorite).length;
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
