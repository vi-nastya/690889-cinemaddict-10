import {PageController} from "./controllers/page-controller";
import {films} from "./mocks/films";
import {UserTitle} from "./components/user-title";
import {Position, render} from "./utils";
import {Movies} from "./models/movies";
import {Statistics} from "./components/statistics";
import {FiltersController} from "./controllers/filters-controller";
import {FilterType} from "./components/filters";

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

const statistics = new Statistics();
const filtersController = new FiltersController(mainContainer, moviesModel);

// TODO: handle no movies case
if (films.length === 0) {
  render(mainContainer, `There are no movies in our database`, Position.BEFOREEND
  );
} else {
  filtersController.setScreenChangeHandler((activeFilter) => {
    switch (activeFilter) {
      case FilterType.DEFAULT: {
        statistics.hide();
        pageController.show();
        break;
      }
      case FilterType.STATS: {
        pageController.hide();
        statistics.show();
        break;
      }
    }
  });
  filtersController.render();

  render(mainContainer, statistics, Position.BEFOREEND);
  statistics.hide();

  const pageController = new PageController(mainContainer, moviesModel);
  pageController.renderFilms();
}

// TODO: add number of movies to footer
