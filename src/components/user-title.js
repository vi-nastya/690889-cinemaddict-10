import AbstractComponent from "./abstract-component";

export default class UserTitle extends AbstractComponent {
  constructor(userTitle) {
    super();
    this._title = userTitle;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._title}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}
