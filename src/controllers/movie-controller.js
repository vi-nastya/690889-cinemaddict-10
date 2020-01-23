import { FilmCard } from "../components/film-card";
import { FilmDetails } from "../components/film-details";
import { render } from "../utils";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
};

export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._bodyElement = document.querySelector(`body`);

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._changePopupToCard = this._changePopupToCard.bind(this);
    this._changeCardToPopup = this._changeCardToPopup.bind(this);
  }

  render(filmData) {
    this._filmComponent = new FilmCard(filmData);
    this._filmDetailsComponent = new FilmDetails(filmData);

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        this._changePopupToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    // add event listeners

    // FilmCard -> open popup
    this._filmComponent.setDetailsOpenClickHandler(() => {
      this._changeCardToPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    // Popup -> close
    this._filmDetailsComponent.setCloseButtonClickHandler(
      this._changePopupToCard
    );

    // TODO: handle FilmCard button clicks (call onDataChange)
    this._filmComponent.setWatchlistButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData, {
        userData: { watchlist: `watchlist UPDATE` }
      });
      this._onDataChange(filmData, newFilmData);
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData, {
        userData: { watchlist: `watchlist UPDATE` }
      });
      this._onDataChange(filmData, newFilmData);
    });
    // this._filmComponent.setWatchedButtonClickHandler();
    // this._filmComponent.setFavoriteButtonClickHandler();

    render(this._container, this._filmComponent);
  }

  _changePopupToCard() {
    // remove popup
    this._bodyElement.removeChild(this._filmDetailsComponent.getElement());

    this._mode = Mode.DEFAULT;
  }

  _changeCardToPopup() {
    this._onViewChange();
    render(this._bodyElement, this._filmDetailsComponent);
    this._mode = Mode.POPUP;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._changePopupToCard();
    }
  }
}
