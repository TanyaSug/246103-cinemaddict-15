import AbstractView from './abstract';


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
    this._element.addEventListener('click', this._buttonClickHandler);
  }
}
