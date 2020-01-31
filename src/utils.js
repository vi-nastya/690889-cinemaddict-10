import {MINUTES_IN_HOUR, UserRank, MinMoviesForRank,
  MAX_CARD_DESCRIPTION_LENGTH, EXTRA_DESCRIPTION_SYMBOL} from "./constants";

export const getUserRank = (movies) => {
  const moviesWatched = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
  if (moviesWatched >= MinMoviesForRank.MOVIE_BUFF) {
    return UserRank.MOVIE_BUFF;
  } else if (moviesWatched >= MinMoviesForRank.FAN) {
    return UserRank.FAN;
  } else if (moviesWatched >= MinMoviesForRank.NOVICE) {
    return UserRank.NOVICE;
  } else {
    return null;
  }
};

export const formatDescription = (description) => {
  return description.length <= MAX_CARD_DESCRIPTION_LENGTH ? description : description.slice(0, MAX_CARD_DESCRIPTION_LENGTH).concat(EXTRA_DESCRIPTION_SYMBOL);
};

export const formatFilmDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration - hours * MINUTES_IN_HOUR;
  return (hours ? `${hours}h` : ``).concat(minutes ? ` ${minutes}m` : ``);
};

export const getHoursAndMinutes = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration - hours * MINUTES_IN_HOUR;
  return {hours, minutes};
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, component, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Position.BEFOREEND:
      container.append(component.getElement());
      break;
    case Position.AFTEREND:
      container.after(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


