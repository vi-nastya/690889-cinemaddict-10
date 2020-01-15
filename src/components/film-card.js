import { AbstractComponent } from "../utils";

export class FilmCard extends AbstractComponent {
  constructor(filmData) {
    super();
    this._title = filmData.filmInfo.title;
    this._rating = filmData.filmInfo.totalRating;
    // TODO: format
    this._year = filmData.filmInfo.release.date;
    // TODO: format
    this._duration = filmData.filmInfo.runtime;
    // TODO: handle multiple genres
    this._genre = filmData.filmInfo.genre[0];
    this._poster = filmData.filmInfo.poster;
    this._numComments = filmData.comments.length;
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year}</span>
      <span class="film-card__duration">${this._duration}</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="./${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
    <a class="film-card__comments">${this._numComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
  }
}
