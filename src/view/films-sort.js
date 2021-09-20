import {SortType} from '../lib/consts';
import Smart from './popup/smart';


const createFilmsSortTemplate = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${(currentSortType  === SortType.BY_DEFAULT) || !currentSortType ? 'sort__button--active' : ''}" data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.BY_DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.BY_RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`
);

export default class FilmsSort extends Smart {
  constructor(currentSortType) {
    super();
    this._data = {currentSortType};
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsSortTemplate(this._data.currentSortType);
  }

  _sortChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortChangeHandler(callback) {
    if (!this._callback.sortTypeChange) {
      this._callback.sortTypeChange = callback;
    }

    this.getElement().addEventListener('click', this._sortChangeHandler);
  }

  restoreHandlers() {
    this.setSortChangeHandler(this._callback.sortTypeChange);
  }
}
