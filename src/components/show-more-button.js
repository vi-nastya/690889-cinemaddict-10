import { AbstractComponent } from "../utils";

export class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
