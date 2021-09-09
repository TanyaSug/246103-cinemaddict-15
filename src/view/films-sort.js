import {SortType} from '../lib/consts';
import Smart from './popup/smart';


const createFilmsSortTemplate = (sortType) => {
  const makeActiveClassName = (type) =>  sortType === type ? 'sort__button--active' : '';
  return `<ul class="sort">
    <li><a href="#" class="sort__button ${makeActiveClassName(SortType.BY_DEFAULT)}" data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${makeActiveClassName(SortType.BY_DATE)}" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${makeActiveClassName(SortType.BY_RATING)}" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class FilmsSort extends Smart  {
  constructor(sortType = SortType.BY_DEFAULT) {
    super();
    this._sortType = sortType;
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsSortTemplate(this._sortType);
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
