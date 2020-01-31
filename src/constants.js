export const Rating = {
  MIN: 1,
  MAX: 9,
  DEFAULT: 0,
};

export const ANIMATION_TIME_SECONDS = 1.5;

export const MAX_CARD_DESCRIPTION_LENGTH = 139;
export const EXTRA_DESCRIPTION_SYMBOL = `…`;

export const ElementClass = {
  COMMENT_FORM: `film-details__new-comment`,
  COMMENT_INPUT: `film-details__comment-input`,
  VISUALLY_HIDDEN: `visually-hidden`,
  ACTIVE_FILTER: `main-navigation__item--active`
};


export const DeleteButtonText = {
  DELETE: `Delete`,
  DELETING: `Deleting...`
};

export const FilterType = {
  ALL: `all`,
  STATS: `stats`,
  WATCHED: `watched`,
  WATCHLIST: `watchlist`,
  FAVORITE: `favorite`
};

export const SortType = {
  RATING: `rating`,
  DATE: `date`,
  DEFAULT: `default`
};

// Page controller
export const NUM_EXTRA_MOVIES = 2;
export const NUM_MOVIES_TO_RENDER = 5;

export const ActionType = {
  ADD: `add`,
  UPDATE: `update`,
  DELETE: `delete`
};

export const ActionObject = {
  MOVIE: `movie`,
  COMMENT: `comment`
};

// movie controller
export const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
};

// statistics
export const Period = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const MINUTES_IN_HOUR = 60;

export const ValueInMilliseconds = {
  SECOND: 1000,
  WEEK: 24 * 60 * 60 * 1000 * 7,
  MONTH: 24 * 60 * 60 * 1000 * 30,
  YEAR: 24 * 60 * 60 * 1000 * 365,
};

export const KeyCode = {
  ESC: 27,
  ENTER: 13
};

export const UserRank = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

export const MinMoviesForRank = {
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 21
};

export const ExtraType = {
  TOP_RATED: `top-rated`,
  MOST_COMMENTED: `most-commented`
};

export const EMOJIS = [{
  id: `emoji-smile`,
  value: `sleeping`,
  image: `smile`
},
{
  id: `emoji-sleeping`,
  value: `neutral-face`,
  image: `sleeping`
},
{
  id: `emoji-gpuke`,
  value: `grinning`,
  image: `puke`
},
{
  id: `emoji-angry`,
  value: `grinning`,
  image: `angry`
},
];
