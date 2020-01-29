import AbstractComponent from "./abstract-component";

export default class UserRank extends AbstractComponent {
  constructor() {
    super();
    this._rank = null;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }

  setRank(rank) {
    this._rank = rank;
  }
}
