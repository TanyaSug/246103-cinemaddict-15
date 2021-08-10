import {createElement} from '../lib/render';

const BUTTON_LABEL = 'Show more';
const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">${BUTTON_LABEL}</button>`;

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
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
