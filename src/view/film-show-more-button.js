// import {createElement, renderElement} from '../lib/render';
// import FilmListContainerView from './film/films-list-container';
import AbstractView from './abstract';
// import {RenderPosition} from '../lib/consts';

const BUTTON_LABEL = 'Show more';
const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">${BUTTON_LABEL}</button>`;

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _buttonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._buttonClickHandler);
  }
}

//
//   const FILMS_QUANTITY = 23;
//   const FILMS_IN_ROW = 5;
//   const REST_OF_FILMS = FILMS_QUANTITY % FILMS_IN_ROW;
//
//   let filmsCount = FILMS_QUANTITY;
//   this._element.addEventListener('click', (evt) => {
//     evt.preventDefault();
//
//     if (filmsCount > 0) {
//       const count = filmsCount > REST_OF_FILMS
//         ? FILMS_IN_ROW : REST_OF_FILMS;
//
//       const filmListContainer = document.querySelector('.films-list__container');
//
//       if (filmListContainer) {
//         renderElement(filmListContainer, new FilmListContainerView({data: this.data, count, onSelect: this.onSelect})
//           .getElement(), RenderPosition.BEFOREEND);
//       }
//
//
//       filmsCount -= count;
//
//       if (filmsCount === 0) {
//         this.removeElement();
//       }
//     }
//
//   });
//
//   return this._element;
// }


