import { FilmCard } from "./components/film-card";
import { FilmDetails } from "./components/film-details";
import { Search } from "./components/search";
import { Menu } from "./components/menu";
import { Sort } from "./components/sort";
import { ShowMoreButton } from "./components/show-more-button";
import { PageController } from "./page-controller";
import { films } from "./mocks/films";
import { UserTitle } from "./components/user-title";
import { Position, render, unrender } from "./utils";
import { Movies } from "./models/movies";
import { Statistics } from "./components/statistics";

const NUM_FILMS = 3;

// calculates data for user stats based on films
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

render(headerContainer, new Search(), Position.BEFOREEND);
// TODO: render search
if (films.length > 0) {
  // TODO: render user title
  render(
    headerContainer,
    new UserTitle(getUserTitle(films)),
    Position.BEFOREEND
  );
}

// RENDER MAIN SECTION
render(mainContainer, new Menu(), Position.BEFOREEND);

// STATISTICS
const statistics = new Statistics();
render(mainContainer, statistics, Position.BEFOREEND);
statistics.hide();

if (films.length === 0) {
  render(
    mainContainer,
    `There are no movies in our database`,
    Position.BEFOREEND
  );
} else {
  const pageController = new PageController(mainContainer, moviesModel);
  pageController.renderFilms();
}
