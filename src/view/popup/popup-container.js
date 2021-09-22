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
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this.removePopUp = this.removePopUp.bind(this);
  }

  getTemplate() {
    return createPopupContainerTemplate();
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('form');
  }

  _onEscKeyDown(evt)  {
    if ( evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.removePopUp();
    }
  }

  appendPopUp() {
    document.body.appendChild(this.getElement());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    document.querySelector('.film-details__close-btn')
      .addEventListener('click', this.removePopUp);
  }

  removePopUp() {
    if (this._element) {
      document.removeEventListener('keydown', this._onEscKeyDown);
      document.querySelector('.film-details__close-btn')
        .removeEventListener('click', this.removePopUp);
      document.body.removeChild(this._element);
      document.body.classList.remove('hide-overflow');
    }
  }
}
