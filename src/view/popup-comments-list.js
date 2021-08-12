import {createElement} from '../lib/render';


const createCommentsListTemplate = () => (
  '   <ul class="film-details__comments-list"></ul>'
);

export default class PopupCommentsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  _createElement () {
    const result = createElement(this.getTemplate());
    const container = result.querySelector('.film-details__comments-list');
    this._element.appendChild();
    return container;
  }

  removeElement() {
    this._element = null;
  }
}
