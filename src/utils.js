// const USER_STATUSES {
//   0 — звание не отображается;
// от 1 до 10 — novice;
// от 11 до 20 — fan;
// от 21 и выше — movie buff;
// }

const MINUTES_IN_HOUR = 60;

export const formatFilmDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration - hours * MINUTES_IN_HOUR;
  return (hours ? `${hours}h` : ``).concat(minutes ? ` ${minutes}m` : ``);
};

export const getUserStatus = (numMovies) => {
  if (numMovies > 0) {
    if (numMovies <= 10) {
      return `novice`;
    } else if (numMovies <= 20) {
      return `fan`;
    } else {
      return `movie buff`;
    }
  }
  return ``;
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

export const unrender = (element) => {
  if (element) {
    element.remove();
    element.removeElement();
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

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(
        `Can't instantiate AbstractComponent, only concrete one.`
      );
    }

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  show() {
    if (this._element) {
      this._element.classList.remove(`visually-hidden`);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(`visually-hidden`);
    }
  }
}

export class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
