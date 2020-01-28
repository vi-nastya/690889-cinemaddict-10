import {PageController} from "./controllers/page-controller";
import {films} from "./mocks/films";
import {UserTitle} from "./components/user-title";
import {Position, render} from "./utils";
import {Movies} from "./models/movies";
import {Statistics} from "./components/statistics";
import {FiltersController} from "./controllers/filters-controller";
import {FilterType} from "./components/filters";
import Api from "./api";

const AUTHORIZATION = `Basic er173jdzbdw`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

// TODO: update and move to utils
const getUserStats = (movies) => {
  return {
    title: `fan`,
    watchlist: 10,
    history: 2,
    favorites: 5
  };
};

const getUserTitle = (movies) => {
  return `fan`;
};

const moviesModel = new Movies();
moviesModel.setMovies(films);

const headerContainer = document.querySelector(`header`);
const mainContainer = document.querySelector(`main`);

if (films.length > 0) {
  // TODO: render user title
  render(headerContainer, new UserTitle(getUserTitle(films)), Position.BEFOREEND);
}

const filtersController = new FiltersController(mainContainer, moviesModel);

api.getMovies().then((movies) => {
  let moviesWithComments = movies;

  // update number in footer
  const footerMoviesNumber = document.querySelector(`.footer__statistics-number`);
  footerMoviesNumber.innerHTML = movies.length;

  const loadComments = moviesWithComments.map((movie) => {
    return api.getComments(movie.id).then((comments) => {
      movie.comments = comments;
    });
  });

  Promise.all(loadComments).then(() => {

    moviesModel.setMovies(moviesWithComments);

    const statistics = new Statistics(moviesModel);

    // TODO: handle no movies case
    filtersController.setScreenChangeHandler((activeFilter) => {
      if (activeFilter === FilterType.STATS) {
        pageController.hide();
        statistics.show();
      } else {
        statistics.hide();
        pageController.show();
      }

    });
    filtersController.render();

    render(mainContainer, statistics, Position.BEFOREEND);
    statistics.hide();

    const pageController = new PageController(mainContainer, moviesModel, api);
    pageController.renderFilms();
  });
});
