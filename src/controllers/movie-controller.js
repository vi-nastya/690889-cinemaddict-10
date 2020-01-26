import { FilmCard } from "../components/film-card";
import { FilmDetails } from "../components/film-details";
import { render } from "../utils";
import { ActionType, ActionObject } from "./page-controller";

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

    // CARD BUTTONS
    this._filmComponent.setFavoriteButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.favorite = !filmData.userDetails.favorite;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.watchlist = !filmData.userDetails.watchlist;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.favorite = !filmData.userDetails.favorite;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    // POPUP BUTTONS
    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.watchlist = !filmData.userDetails.watchlist;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.alreadyWatched = !filmData.userDetails
        .alreadyWatched;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);

      // TODO: rerender Movie controller - popup
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.favorite = !filmData.userDetails.favorite;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    // RATING
    this._filmDetailsComponent.setRatingClickHandler((userRating) => {
      const newFilmData = Object.assign({}, filmData);
      newFilmData.userDetails.personalRating = userRating;
      this._onDataChange(ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    // DELETE COMMENT
    this._filmDetailsComponent.setDeleteCommentClickHandler(
      (deletedCommentId) => {
        this._onDataChange(ActionObject.COMMENT, ActionType.DELETE, {
          commentId: deletedCommentId,
          movieId: filmData.id
        });
      }
    );

    this._filmDetailsComponent.setFormSubmitHandler((commentData) => {
      this._onDataChange(ActionObject.COMMENT, ActionType.ADD, {
        commentData,
        movieId: filmData.id
      });
    });

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
