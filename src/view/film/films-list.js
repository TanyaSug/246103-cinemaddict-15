import AbstractView from '../abstract';
import {createElement} from '../../lib/render';
import FilmCard from './film-card';
import {FILMS_COUNT} from '../../lib/consts';
import {isFilmFlag} from '../../lib/is-film-flag';
import {isOrderOk} from '../../lib/is-order-ok';
const createFilmsListContainerTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
  </section>`
);


export default class FilmsList extends AbstractView {
  constructor(props) {
    const {data, onSelect, onRender} = props;
    super();
    this._data = data;
    this._onSelect = onSelect;
    this._onRender = onRender;
    this._container = null;
    // this._onSelect = this._onSelect.bind(this);
  }

  getTemplate() {
    return createFilmsListContainerTemplate();
  }

  // getElement() {
  //   if (!this._element) {
  //     this._element = this._createElement();
  //   }
  //   return this._element;
  // }

  _createElementWithRealData (container, startIndex = 0, count = FILMS_COUNT, currentFilter = 'all', sortOrder = 'original') {
    this._data
      .filter((element) => isFilmFlag(element, currentFilter))
      .sort((left, right) => isOrderOk(left, right, sortOrder))
      .slice(startIndex, startIndex + count)
      .map((film) => {
        const filmCard = new FilmCard(film, this._onSelect);

        this._onRender(film.id, filmCard);
        const element = filmCard.getElement();

        // filmCard.setPopupClickHandler((updatedFilm) => this._onSelect(FilmClickIds.POP_UP, updatedFilm));
        //
        // filmCard.setFavoritesClickHandler((updatedFilm) => this._onSelect(FilmClickIds.FAVORITES, updatedFilm));
        // filmCard.setWatchlistClickHandler((updatedFilm) => this._onSelect(FilmClickIds.WATCH_LIST, updatedFilm));
        // filmCard.setWatchedClickHandler((updatedFilm) => this._onSelect(FilmClickIds.WATCHED, updatedFilm));

        return element;
      })
      .forEach((element) => {
        container.appendChild(element);
      });
    return container;
  }
  //
  // addMoreFilms(startIndex, count) {
  //   if(this._container) {
  //     this._createElementWithRealData(this._container, startIndex, count);
  //   }
  // }

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


