import {getHoursAndMinutes, getUserRank} from "../utils";
import Chart from "chart.js";
import AbstractSmartComponent from "./abstract-smart-component";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Period, ValueInMilliseconds} from "../constants";

const ChartParams = {
  CHART_TYPE: `horizontalBar`,
  BACKGROUND_COLOR: `#ffe800`,
  BAR_THICKNESS: 22,
  MIN_BAR_LENGTH: 0,
  DISPLAY_NONE_STATE: false,
  COLOR: `#fff`,
  TOOLTIPS_ENABLED_STATE: false,
  FONT_SIZE: 16,
  LEGEND_STATE: false,
  DATA_LABELS_POSITION: `start`,
  DATA_LABELS_OFFSET: 25,
  STACKED_STATE: true,
  TICKS_PADDING: 60
};


const getMoviesForPeriod = (moviesData, period) => {
  const watchedMovies = moviesData.filter((movie) => movie.userDetails.alreadyWatched);
  const currentTimestamp = Date.now();
  let minTimestamp = 0;
  switch (period) {
    case Period.ALL:
      minTimestamp = 0;
      break;
    case Period.TODAY:
      minTimestamp = new Date().setHours(0, 0, 0, 0);
      break;
    case Period.WEEK:
      minTimestamp = currentTimestamp - ValueInMilliseconds.WEEK; // TODO
      break;
    case Period.MONTH:
      minTimestamp = currentTimestamp - ValueInMilliseconds.MONTH; // TODO
      break;
    case Period.YEAR:
      minTimestamp = currentTimestamp - ValueInMilliseconds.YEAR; // TODO
      break;
  }

  const moviesForStats = watchedMovies.filter((movie) => Date.parse(movie.userDetails.watchingDate) >= minTimestamp);
  return moviesForStats;
};

const getGenresStats = (moviesData) => {
  const labels = [];
  const values = [];
  const stats = {};

  for (const movie of moviesData) {
    if (movie.filmInfo.genres.length > 0) {
      movie.filmInfo.genres.forEach((genre) => {
        if (!(genre in stats)) {
          stats[genre] = movie.filmInfo.runtime;
          labels.push(genre);
        } else {
          stats[genre] += movie.filmInfo.runtime;
        }
      });
    }
  }

  for (const genre of labels) {
    values.push(stats[genre]);
  }

  return {stats, labels, values};
};

const getTopGenre = (moviesData) => {
  const stats = getGenresStats(moviesData);
  if (moviesData.length === 0) {
    return `-`;
  }
  return stats.labels[stats.values.indexOf(Math.max(...stats.values))];
};

const getStats = (moviesData) => {
  const numMovies = moviesData.length;
  const totalDuration = getHoursAndMinutes(moviesData.map((movie) => movie.filmInfo.runtime).reduce((a, b) => a + b, 0));
  const topGenre = getTopGenre(moviesData); // TODO
  return {
    numMovies, totalDuration, topGenre
  };
};

export default class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._model = moviesModel;
    this._currentPeriod = Period.ALL;
    this._movies = getMoviesForPeriod(this._model.getAllMovies(), Period.ALL);
    this._moviesForPeriod = this._movies;

    this._setPeriodChangeHandler = this._setPeriodChangeHandler.bind(this);
    this._subscribeOnEvents = this._subscribeOnEvents.bind(this);

    this._subscribeOnEvents();
  }

  getTemplate() {
    this._movies = getMoviesForPeriod(this._model.getAllMovies(), Period.ALL);
    this._moviesForPeriod = this._movies;
    const statsData = getStats(this._moviesForPeriod, this._currentPeriod);
    const rank = getUserRank(this._movies);
    return `<section class="statistic">
    ${ rank ? `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>` : ``}

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
      <canvas id="genres-chart" class="statistic__chart" width="1000"></canvas>
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
      const statsValues = getGenresStats(this._moviesForPeriod);
      this._genresLabels = statsValues.labels;
      this._genresValues = statsValues.values;

      this.rerender(this._moviesForPeriod);
    });
  }

  updateChart() {
    const statsValues = getGenresStats(this._moviesForPeriod);
    this._genresLabels = statsValues.labels;
    this._genresValues = statsValues.values;

    if (this._genresLabels.length && this._genresValues.length) {
      const ctx = this.getElement().querySelector(`#genres-chart`).getContext(`2d`);
      return new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: ChartParams.CHART_TYPE,
        data: {
          labels: this._genresLabels,
          datasets: [{
            data: this._genresValues,
            backgroundColor: ChartParams.BACKGROUND_COLOR,
            barThickness: ChartParams.BAR_THICKNESS,
            minBarLength: ChartParams.MIN_BAR_LENGTH
          }]
        },
        gridLines: {
          display: ChartParams.DISPLAY_NONE_STATE
        },
        options: {
          label: {
            font: {
              color: ChartParams.COLOR
            }
          },
          tooltips: {
            enabled: ChartParams.TOOLTIPS_ENABLED_STATE
          },
          plugins: {
            datalabels: {
              anchor: ChartParams.DATA_LABELS_POSITION,
              align: ChartParams.DATA_LABELS_POSITION,
              offset: ChartParams.DATA_LABELS_OFFSET,
              color: ChartParams.COLOR,
              font: {
                size: ChartParams.FONT_SIZE
              }
            }
          },
          legend: ChartParams.LEGEND_STATE,
          scales: {
            xAxes: [{
              gridLines: {
                display: ChartParams.DISPLAY_NONE_STATE
              },
              ticks: {
                display: ChartParams.DISPLAY_NONE_STATE
              },
              stacked: ChartParams.STACKED_STATE
            }],
            yAxes: [{
              gridLines: {
                display: ChartParams.DISPLAY_NONE_STATE
              },
              ticks: {
                fontSize: ChartParams.FONT_SIZE,
                fontColor: ChartParams.COLOR,
                padding: ChartParams.TICKS_PADDING
              },
              stacked: ChartParams.STACKED_STATE
            }]
          }
        }
      });
    }
    return null;
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

  show() {
    this.rerender();
    this.updateChart();
  }
}
