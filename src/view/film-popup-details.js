import {createElement} from '../lib/render';
import {createFilmPopupCard} from './film-popup-card';


export default class FilmPopupDetails {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupCard();
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

