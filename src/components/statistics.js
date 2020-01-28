import {AbstractSmartComponent, getHoursAndMinutes} from "../utils";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const Period = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;
const MILLISECONDS_IN_MONTH = MILLISECONDS_IN_DAY * 30;
const MILLISECONDS_IN_YEAR = MILLISECONDS_IN_DAY * 365;


const getMoviesForPeriod = (moviesData, period) => {
  const watchedMovies = moviesData.filter((movie) => movie.userDetails.alreadyWatched);
  const currentTimestamp = Date.now();
  let minTimestamp = 0;
  switch (period) {
    case Period.ALL:
      minTimestamp = 0;
      break;
    case Period.TODAY:
      minTimestamp = Date.parse(new Date().setHours(0, 0, 0, 0)); // TODO
      break;
    case Period.WEEK:
      minTimestamp = currentTimestamp - MILLISECONDS_IN_WEEK; // TODO
      break;
    case Period.MONTH:
      minTimestamp = currentTimestamp - MILLISECONDS_IN_MONTH; // TODO
      break;
    case Period.YEAR:
      minTimestamp = currentTimestamp - MILLISECONDS_IN_YEAR; // TODO
      break;
  }

  const moviesForStats = watchedMovies.filter((movie) => Date.parse(movie.userDetails.watchingDate) >= minTimestamp);
  return moviesForStats;
};

const getStats = (moviesData) => {
  const numMovies = moviesData.length;
  const totalDuration = getHoursAndMinutes(moviesData.map((movie) => movie.filmInfo.runtime).reduce((a, b) => a + b, 0));
  const topGenre = `Sci-Fi`; // TODO
  return {
    numMovies, totalDuration, topGenre
  };
};

export class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._model = moviesModel;
    this._currentPeriod = Period.ALL;
    this._movies = moviesModel.getAllMovies();
    this._moviesForPeriod = this._movies;

    this._setPeriodChangeHandler = this._setPeriodChangeHandler.bind(this);
    this._subscribeOnEvents = this._subscribeOnEvents.bind(this);

    this._subscribeOnEvents();
  }
  // TODO: update rank
  getTemplate() {
    const statsData = getStats(this._moviesForPeriod, this._currentPeriod);
    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    ${this._getPeriodSelectorMarkup()}

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${statsData.numMovies} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${statsData.totalDuration.hours} <span class="statistic__item-description">h</span> ${statsData.totalDuration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${statsData.topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
  }

  _getPeriodSelectorMarkup() {
    return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._currentPeriod === Period.ALL ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._currentPeriod === Period.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._currentPeriod === Period.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._currentPeriod === Period.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._currentPeriod === Period.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>`;
  }

  _setPeriodChangeHandler() {
    const periodsForm = this.getElement().querySelector(`.statistic__filters`);
    periodsForm.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this._movies = this._model.getAllMovies();
      this._currentPeriod = evt.target.value;

      this._moviesForPeriod = getMoviesForPeriod(this._movies, this._currentPeriod);
      this.rerender(this._moviesForPeriod);
    });
  }

  rerender() {
    super.rerender();
    this.updateChart();
  }

  _subscribeOnEvents() {
    this._setPeriodChangeHandler();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }
}
