import {formatFilmDuration} from "../utils";
import AbstractComponent from "./abstract-component";
import moment from 'moment';

const getButtonMarkup = (buttonClass, buttonText, isActive) => {
  return `<button class="film-card__controls-item button film-card__controls-item--${buttonClass} ${
    isActive ? `film-card__controls-item--active` : ``}">${buttonText}</button>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(filmData) {
    super();
    this._title = filmData.filmInfo.title;
    this._rating = filmData.filmInfo.totalRating;
    // TODO: format
    this._year = moment(filmData.filmInfo.release.date).format(`YYYY`);
    // TODO: format
    this._duration = filmData.filmInfo.runtime;
    // TODO: handle multiple genres
    this._genre = filmData.filmInfo.genre[0];
    this._poster = filmData.filmInfo.poster;
    this._numComments = filmData.comments.length;

    this._watched = filmData.userDetails.alreadyWatched;
    this._watchlist = filmData.userDetails.watchlist;
    this._favorite = filmData.userDetails.favorite;
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year}</span>
      <span class="film-card__duration">${formatFilmDuration(this._duration)}</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="./${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
    <a class="film-card__comments">${this._numComments} comments</a>
    <form class="film-card__controls">
    ${getButtonMarkup(`add-to-watchlist`, `Add to watchlist`, this._watchlist)}
    ${getButtonMarkup(`mark-as-watched`, `Mark as watched`, this._watched)}
    ${getButtonMarkup(`favorite`, `Mark as favorite`, this._favorite)}
    </form>
  </article>`;
  }

  setWatchlistButtonClickHandler(handler) {
    const buttonElement = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    buttonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      buttonElement.classList.toggle(`film-card__controls-item--active`);
      handler();
    });
  }

  setWatchedButtonClickHandler(handler) {
    const buttonElement = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    buttonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      buttonElement.classList.toggle(`film-card__controls-item--active`);
      handler();
    });
  }

  setFavoriteButtonClickHandler(handler) {
    const buttonElement = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    buttonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      buttonElement.classList.toggle(`film-card__controls-item--active`);
      handler();
    });
  }

  setDetailsOpenClickHandler(handler) {
    const poster = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comments = this.getElement().querySelector(`.film-card__comments`);

    [poster, title, comments].forEach((item) =>
      item.addEventListener(`click`, handler)
    );
  }
}
