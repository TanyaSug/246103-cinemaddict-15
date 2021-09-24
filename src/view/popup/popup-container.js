import AbstractView from '../abstract';

const createPopupContainerTemplate = () => (
  `<section class="film-details">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
     <form class="film-details__inner" action="" method="get">

     </form>
   </section>`
);


export default class PopupContainer extends AbstractView {
  constructor(filmData, onPopupClosing) {
    super();
    this._filmData = filmData;
    this._onPopupClosing = onPopupClosing;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._remove = this._remove.bind(this);
  }

  getTemplate() {
    return createPopupContainerTemplate();
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('form');
  }

  append() {
    document.body.appendChild(this.getElement());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    document.querySelector('.film-details__close-btn')
      .addEventListener('click', this._remove);
  }

  _onEscKeyDown(evt)  {
    if ( evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._remove();
    }
  }

  _clearListeners() {
    document.removeEventListener('keydown', this._onEscKeyDown);
    document.querySelector('.film-details__close-btn')
      .removeEventListener('click', this._remove);
  }

  _remove() {
    if (this._element) {
      this._clearListeners();
      this._onPopupClosing();
      document.body.removeChild(this._element);
      document.body.classList.remove('hide-overflow');
    }
  }
}
