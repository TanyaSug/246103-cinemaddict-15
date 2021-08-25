import AbstractView from '../abstract';
import {createElement} from '../../lib/render';
import Film1Card from './film-card';


const createFilmsListContainerTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
  </section>`
);


const noop = () => undefined;
export default class FilmsListContainer extends AbstractView {
  constructor(props) {
    const {data, count = 5, onSelect = noop, onSelect1 = noop} = props;
    super();
    this._data = data;
    this._count = count;
    this._onSelect = onSelect;
    this._onSelect1 = onSelect1;
    this._handleFilmSelect = this._handleFilmSelect.bind(this);
  }

  getTemplate() {
    return createFilmsListContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement();
    }
    return this._element;
  }

  _handleFilmSelect(film) {
    this._onSelect(film);
  }

  _handleFilmSelect1(film) {
    this._onSelect1(film);
  }

  _createElementWithRealData (container) {
    this._data
      .slice(0, this._count)
      .map((film) => {
        const filmCard = new Film1Card(
          { ...film.filmInfo });

        const element = filmCard.getElement();
        filmCard.setPopupClickHandler(() => {
          this._handleFilmSelect(film);
        });
        filmCard.setFavoritesClickHandler(() => this._handleFilmSelect1(film));

        return element;
      })
      .forEach((element) => {
        container.appendChild(element);
      });
    return container;
  }

  _createElementWithoutData (container) {
    const child = document.createTextNode('Loading...');
    container.appendChild(child);
    return container;
  }

  _fillContainer (container) {
    if (Array.isArray(this._data)) {
      return this._createElementWithRealData(container);
    }
    return this._createElementWithoutData(container);
  }

  _createElement () {
    const result = createElement(this.getTemplate());
    this._fillContainer(
      result.querySelector('.films-list__container'),
    );
    return result;
  }
}


