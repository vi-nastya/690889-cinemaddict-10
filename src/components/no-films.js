import { AbstractComponent } from "../utils";

export class NoFilms extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`;
  }
}
