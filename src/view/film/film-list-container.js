import AbstractView from '../abstract';
import {createElement} from '../../lib/render';
import Film1Card from './film-card';

const createFilmsListContainerTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
</section>`
);

const noop = () => undefined;
export default class FilmsListContainer extends AbstractView {
  constructor(props) {
    const {data, count = 5, onSelect = noop} = props;
    super();
    this._data = data;
    this._count = count;
    this._onSelect = onSelect;
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

  _createElementWithRealData (container) {
    this._data
      .slice(0, this._count)
      .map((film) => new Film1Card(
        {
          ...film.filmInfo,
          onClick:() => this._handleFilmSelect(film),
        }))
      .forEach((filmView) => container.appendChild(filmView.getElement()));
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


