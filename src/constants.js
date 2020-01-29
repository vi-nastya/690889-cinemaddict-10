export const MIN_RATING = 1;
export const MAX_RATING = 9;
export const DEFAULT_RATING = 0;

export const ANIMATION_TIME_SECONDS = 1.5;
export const MILLISECONDS_IN_SECOND = 1000;

export const COMMENT_FORM_CLASS = `film-details__new-comment`;
export const COMMENT_INPUT_CLASS = `film-details__comment-input`;
export const VISUALLY_HIDDEN_CLASS = `visually-hidden`;

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

export const ACTIVE_FILTER_CLASS = `main-navigation__item--active`;

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

export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
export const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;
export const MILLISECONDS_IN_MONTH = MILLISECONDS_IN_DAY * 30;
export const MILLISECONDS_IN_YEAR = MILLISECONDS_IN_DAY * 365;
export const MINUTES_IN_HOUR = 60;

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
