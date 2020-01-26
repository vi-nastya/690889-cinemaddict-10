import {Filters} from "../components/filters";
import {render} from "../utils";

export class FiltersController {
  constructor(container, moviesModel) {
    this._contaiter = container;
    this._moviesModel = moviesModel;
    this._filtersComponent = new Filters();
  }

  render() {
    // TODO
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._contaiter, this._filtersComponent);
  }

  getFiltersCount() {
    const moviesData = this._moviesModel.getAllMovies();
    const watched = moviesData.filter((movie) => movie.userDetails.alreadyWatched).length;
    const watchlist = moviesData.filter((movie) => movie.userDetails.watchlist).length;
    const favorite = moviesData.filter((movie) => movie.userDetails.favorite).length;
  }

  _onFilterChange() {
    // TODO
  }
}
