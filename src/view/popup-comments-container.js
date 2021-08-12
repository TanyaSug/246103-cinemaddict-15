import {createElement} from '../lib/render';

const createCommentsContainerTemplate = () => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
      </section>
    </div>`
);

export default class PopupCommentsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
