import AbstractView from './abstract';
import {SortType} from '../lib/consts';

const createFilmsSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`
);

export default class FilmsSort extends AbstractView  {
  constructor() {
    super();
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsSortTemplate();
  }

  _sortChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortChangeHandler);
  }
}
