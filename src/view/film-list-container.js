import {createElement} from '../lib/render';
import Film1Card from './film-card';

const createFilmCardTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
</section>`
);

export default class FilmListContainer {
  constructor({data, count = 5, onSelect}) {
    this._data = data;
    this._count = count;
    this._onSelect = onSelect;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate();
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

  _createElement () {
    const result = createElement(this.getTemplate());
    const container = result.querySelector('.films-list__container');
    this._data
      .slice(0, this._count)
      .map((film) => new Film1Card(
        {
          ...film.filmInfo,
          onClick:() => this._handleFilmSelect(film)}))
      .forEach((filmView) => container.appendChild(filmView.getElement()));
    return container;
  }

  removeElement() {
    this._element = null;
  }
}


