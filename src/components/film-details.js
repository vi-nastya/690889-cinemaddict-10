import {formatFilmDuration} from "../utils";
import moment from 'moment';
import AbstractSmartComponent from "./abstract-smart-component";
import {MIN_RATING, MAX_RATING, COMMENT_FORM_CLASS, COMMENT_INPUT_CLASS, ANIMATION_TIME_SECONDS, MILLISECONDS_IN_SECOND, DeleteButtonText, EMOJIS} from "../constants";
import he from "he";

const getCommentMarkup = (comment) => {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${moment(comment.date).format(`YYYY/MM/DD HH:MM`)}</span>
      <button class="film-details__comment-delete" data-id=${comment.id}>${DeleteButtonText.DELETE}</button>
    </p>
  </div>
</li>`;
};

const getRatingFormMarkup = (userRating, poster) => {
  const ratingValues = [...Array(MAX_RATING + MIN_RATING).keys()].slice(MIN_RATING);
  return `<div class="form-details__middle-container">
  <section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>

    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="./${poster}" alt="film-poster" class="film-details__user-rating-img">
      </div>

      <section class="film-details__user-rating-inner">
        <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

        <p class="film-details__user-rating-feelings">How you feel it?</p>

        <div class="film-details__user-rating-score">
        ${ratingValues
          .map((value) => {
            return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
              value="${value}" id="rating-${value}" ${userRating === value ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-${value}">${value}</label>`;
          })
          .join(`\n`)}
        </div>
      </section>
    </div>
  </section>
</div>`;
};

const getEmojiInputMarkup = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="${emoji.id}" value="${emoji.value}">
  <label class="film-details__emoji-label" for="${emoji.id}">
    <img src="./images/emoji/${emoji.image}.png" width="30" height="30" alt="emoji">
  </label>`;
};

const getNewCommentMarkup = () => {
  return `<div class="film-details__new-comment">
  <div for="add-emoji" class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list">
  ${EMOJIS.map((emoji) => getEmojiInputMarkup(emoji)).join(``)}
  </div>
</div>`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmData) {
    super();
    this._title = filmData.filmInfo.title;
    this._rating = filmData.filmInfo.totalRating;
    this._description = filmData.filmInfo.description;

    this._year = filmData.filmInfo.release.date;
    this._country = filmData.filmInfo.release.releaseCountry;

    this._duration = filmData.filmInfo.runtime;

    this._genre = (filmData.filmInfo.genres.length === 0) ? null : filmData.filmInfo.genres;
    this._poster = filmData.filmInfo.poster;
    this._numComments = filmData.comments.length;
    this._director = filmData.filmInfo.director;
    this._actors = filmData.filmInfo.actors;
    this._writers = filmData.filmInfo.writers;
    this._releaseDate = filmData.filmInfo.release.date;

    this._comments = filmData.comments;

    this._userRating = filmData.userDetails.personalRating;
    this._watched = filmData.userDetails.alreadyWatched;
    this._watchlist = filmData.userDetails.watchlist;
    this._favorite = filmData.userDetails.favorite;

    // handlers for eventListeners
    this._closeButtonClickHandler = null;
    this._watchlistClickHandler = null;
    this._watchedClickHandler = null;
    this._favoriteClickHandler = null;
    this._ratingClickHandler = null;
    this._formSubmitHandler = null;
    this._deleteCommentHandler = null;
    this._undoClickHandler = null;
  }

  getTemplate() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${this._poster}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${moment(this._releaseDate).format(`D MMMM YYYY`)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatFilmDuration(this._duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            ${!this._genre ? `` : `<tr class="film-details__row">
              <td class="film-details__term">Genre${this._genre.length > 1 ? `s` : ``}</td>
              <td class="film-details__cell">
                ${this._genre
                  .map((el) => `<span class="film-details__genre">${el}</span>`)
                  .join(``)}</td>
            </tr>`}

          </table>

          <p class="film-details__film-description">
            ${this._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._watched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._favorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    ${this._watched ? getRatingFormMarkup(this._userRating, this._poster) : ``}
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${this._comments.map(getCommentMarkup).join(`\n`)}
        </ul>

        ${getNewCommentMarkup()}
      </section>
    </div>
  </form>
</section>`;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
    this._watchlistClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
    this._watchedClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  // DELETE COMMENTS LOGIC
  setDeleteCommentClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(
        `.film-details__comment-delete`
    );
    deleteButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentId = evt.target.getAttribute(`data-id`);

        // disable
        evt.target.textContent = DeleteButtonText.DELETING;
        evt.target.disabled = true;

        handler(commentId);
      });
    });
    this._deleteCommentHandler = handler;
  }

  onDeleteError() {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((button) => {
      button.textContent = DeleteButtonText.DELETE;
      button.disabled = false;
    });
  }

  // ADD COMMENT LOGIC
  setReactionSelectHandler() {
    const emojiButtons = this.getElement().querySelectorAll(
        `.film-details__emoji-item`
    );
    const emojiContainer = this.getElement().querySelector(
        `.film-details__add-emoji-label`
    );
    emojiButtons.forEach((button) => {
      button.addEventListener(`change`, (evt) => {
        this._selectedEmojiId = evt.target.getAttribute(`id`);
        const selectedEmojiLabel = this.getElement().querySelector(
            `label[for="${this._selectedEmojiId}"]`
        );
        const emojiPictureSrc = selectedEmojiLabel
          .querySelector(`img`)
          .getAttribute(`src`);
        emojiContainer.innerHTML = `<img src="${emojiPictureSrc}" width="55" height="55" alt="emoji">`;
      });
    });
  }

  _getEmotionById(reactionId) {
    switch (reactionId) {
      case `emoji-smile`:
        return `smile`;
      case `emoji-sleeping`:
        return `sleeping`;
      case `emoji-gpuke`:
        return `puke`;
      case `emoji-angry`:
        return `angry`;
    }
    return `undefined`;
  }

  _getNewCommentData() {
    const emotion = this._getEmotionById(this._selectedEmojiId);
    const comment = this.getElement().querySelector(
        `.film-details__comment-input`
    ).value;
    return {
      emotion,
      comment,
      date: new Date().toISOString()
    };
  }

  setFormSubmitHandler(handler) {
    const commentForm = this.getElement().querySelector(`.film-details__new-comment`);
    commentForm.addEventListener(`keydown`, (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 13)) {
        const commentData = this._getNewCommentData();

        this.getElement().querySelector(`.${COMMENT_INPUT_CLASS}`).disabled = true;

        handler(commentData);
      }
    });

    this._formSubmitHandler = handler;
  }

  unlockCommentSubmitForm() {
    this.getElement().querySelector(`.${COMMENT_INPUT_CLASS}`).disabled = false;
  }

  // ADD RATING LOGIC
  setRatingClickHandler(handler) {
    if (this._watched) {
      this.getElement()
        .querySelector(`.film-details__user-rating-score`)
        .addEventListener(`change`, (evt) => {
          evt.stopPropagation();
          const userRating = this.getElement().querySelector(
              `.film-details__user-rating-input:checked`
          ).value;
          handler(Number(userRating));
        });
      this._ratingClickHandler = handler;
    }
  }

  setUndoRatingClickHandler(handler) {
    const undoButton = this.getElement().querySelector(`.film-details__watched-reset`);
    if (undoButton) {
      undoButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
    }
    this._undoClickHandler = handler;
  }

  shake() {
    const commentForm = this.getElement().querySelector(`.${COMMENT_FORM_CLASS}`);
    if (commentForm) {
      commentForm.style.animation = `shake ${ANIMATION_TIME_SECONDS}s`;
      this.getElement().style.animation = `shake ${ANIMATION_TIME_SECONDS}s`;

      setTimeout(() => {
        commentForm.style.animation = ``;
        this.getElement().style.animation = ``;
      }, ANIMATION_TIME_SECONDS * MILLISECONDS_IN_SECOND);
    }
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteClickHandler);
    this.setWatchedButtonClickHandler(this._watchedClickHandler);
    this.setWatchlistButtonClickHandler(this._watchlistClickHandler);
    this.setRatingClickHandler(this._ratingClickHandler);
  }
}
