import { AbstractComponent } from "../utils";

export class ContentContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>

      <button class="films-list__show-more">Show more</button>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>
  </section>`;
  }
}
