import { FilmCard } from "../components/film-card";
import { FilmDetails } from "../components/film-details";
import { render } from "../utils";

export class MovieController {
  constructor(container) {
    this._container = container;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
  }

  render(filmData) {
    this._filmComponent = new FilmCard(filmData);
    this._filmDetailsComponent = new FilmDetails(filmData);
  }

  _changePopupToCard() {}

  _changeCardToPopup() {}
}
