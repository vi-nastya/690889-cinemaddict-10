import {Filters} from "../components/filters";

export class FiltersController {
  constructor(container, moviesModel) {
    this._contaiter = container;
    this._moviesModel = moviesModel;
    this._filtersComponent = new Filters();
  }

  render() {
    // TODO
  }

  getFiltersCount(moviesData) {
    const watched = moviesData.filter((movie) => movie.userDetails.alreadyWatched).length;
    const watchlist = moviesData.filter((movie) => movie.userDetails.watchlist).length;
    const favorite = moviesData.filter((movie) => movie.userDetails.favorite).length;
  }
}
