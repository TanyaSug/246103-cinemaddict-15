import {createElement, renderElement, RenderPosition} from '../lib/render';
import FilmListContainerView from './film/film-list-container';

const BUTTON_LABEL = 'Show more';
const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">${BUTTON_LABEL}</button>`;

export default class ShowMoreButton {
  constructor({data, onSelect}) {
    this.data = data;
    this.onSelect = onSelect;
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    const FILMS_QUANTITY = 23;
    const FILMS_IN_ROW = 5;
    const REST_OF_FILMS = FILMS_QUANTITY % FILMS_IN_ROW;

    let filmsCount = FILMS_QUANTITY;
    this._element.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (filmsCount > 0) {
        const count = filmsCount > REST_OF_FILMS
          ? FILMS_IN_ROW : REST_OF_FILMS;

        const filmListContainer = document.querySelector('.films-list__container');

        if (filmListContainer) {
          renderElement(filmListContainer, new FilmListContainerView({data: this.data, count, onSelect: this.onSelect})
            .getElement(), RenderPosition.BEFOREEND);
        }


        filmsCount -= count;

        if (filmsCount === 0) {
          this.removeElement();
        }
      }

    });

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element.remove();
    }
  }
}
