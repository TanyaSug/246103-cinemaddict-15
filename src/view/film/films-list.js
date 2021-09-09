import AbstractView from '../abstract';
import {createElement} from '../../lib/render';
import FilmCard from './film-card';
import {FilmClickIds, FILMS_COUNT} from '../../lib/consts';


const createFilmsListContainerTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
  </section>`
);


const noop = () => undefined;
export default class FilmsList extends AbstractView {
  constructor(props) {
    const {data, onSelect = noop, onRender} = props;
    super();
    this._data = data;
    // this._count = count;
    this._onSelect = onSelect;
    this._onRender = onRender;
    this._container = null;
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

  _handleFilmSelect(key, film) {
    this._onSelect(key, film);
  }

  _createElementWithRealData (container, startIndex = 0, count = FILMS_COUNT) {
    this._data
      .slice(startIndex, startIndex + count)
      .map((film) => {
        const filmCard = new FilmCard(film);

        this._onRender(film.id, filmCard);
        const element = filmCard.getElement();
        filmCard.setPopupClickHandler(() => this._handleFilmSelect(FilmClickIds.POP_UP, film));
        filmCard.setFavoritesClickHandler((updatedFilm) => this._handleFilmSelect(FilmClickIds.FAVORITES, updatedFilm));
        filmCard.setWatchlistClickHandler((updatedFilm) => this._handleFilmSelect(FilmClickIds.WATCH_LIST, updatedFilm));
        filmCard.setWatchedClickHandler((updatedFilm) => this._handleFilmSelect(FilmClickIds.WATCHED, updatedFilm));
        return element;
      })
      .forEach((element) => {
        container.appendChild(element);
      });
    return container;
  }

  addMoreFilms(startIndex, count) {
    if(this._container) {
      this._createElementWithRealData(this._container, startIndex, count);
    }
  }

  _createElementWithoutData (container) {
    const child = document.createTextNode('Loading...');
    container.appendChild(child);
    return container;
  }

  _fillContainer (container) {
    this._container = container;

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


