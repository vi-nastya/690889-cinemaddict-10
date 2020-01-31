import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render, replace} from "../utils";
import Movie from "../models/movie";
import {ActionType, ActionObject, Mode, Rating} from "../constants";

export default class MovieController {
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
    // if rerendering, replace existing components
    let isReplacingComponents = false;
    let prevCardComponent = null;
    let prevDetailsComponent = null;
    if (this._filmComponent && this._filmDetailsComponent) {
      isReplacingComponents = true;
      prevCardComponent = this._filmComponent;
      prevDetailsComponent = this._filmDetailsComponent;
    }

    this._filmComponent = new FilmCard(filmData);
    this._filmDetailsComponent = new FilmDetails(filmData);

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        this._changePopupToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

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
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.favorite = !filmData.userDetails.favorite;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.alreadyWatched = !filmData.userDetails.alreadyWatched;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.watchlist = !filmData.userDetails.watchlist;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    // POPUP BUTTONS
    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.watchlist = !filmData.userDetails.watchlist;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.alreadyWatched = !filmData.userDetails
        .alreadyWatched;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);

      // TODO: rerender Movie controller - popup
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.favorite = !filmData.userDetails.favorite;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    // RATING
    this._filmDetailsComponent.setRatingClickHandler((userRating) => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.personalRating = userRating;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmDetailsComponent.setUndoRatingClickHandler(() => {
      const newFilmData = Movie.clone(filmData);
      newFilmData.userDetails.personalRating = Rating.DEFAULT;
      this._onDataChange(this, ActionObject.MOVIE, ActionType.UPDATE, newFilmData);
    });

    this._filmDetailsComponent.setReactionSelectHandler();

    // DELETE COMMENT
    this._filmDetailsComponent.setDeleteCommentClickHandler(
        (deletedCommentId) => {
          this._onDataChange(this, ActionObject.COMMENT, ActionType.DELETE, {
            commentId: deletedCommentId,
            movieId: filmData.id
          });
        }
    );

    // ADD COMMENT
    this._filmDetailsComponent.setFormSubmitHandler((commentData) => {
      this._onDataChange(this, ActionObject.COMMENT, ActionType.ADD, {
        commentData,
        movieId: filmData.id
      });
    });

    if (isReplacingComponents) {
      replace(this._filmComponent, prevCardComponent);
      replace(this._filmDetailsComponent, prevDetailsComponent);

    } else {
      render(this._container, this._filmComponent);
    }
  }

  _changePopupToCard() {
    this._bodyElement.removeChild(this._filmDetailsComponent.getElement());
    this._mode = Mode.DEFAULT;
  }

  handleAddCommentError() {
    this._filmDetailsComponent.shake();
    this._filmDetailsComponent.unlockCommentSubmitForm();
  }

  handleDeleteError() {
    this._filmDetailsComponent.onDeleteError();
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
