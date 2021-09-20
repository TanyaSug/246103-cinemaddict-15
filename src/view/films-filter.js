import Abstract from './abstract';
import {getUrlHash} from '../lib/get-url-hash';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  const filterCount = type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : '';
  const activeFilter = type === currentFilterType ? 'main-navigation__item--active' : '';
  return `<a href="#${type}" class="main-navigation__item ${activeFilter}" data-filter="${type}">${name} ${filterCount}</a>`;
};

const createFilmsFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
            <div class="main-navigation__items">${filterItemsTemplate}</div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export default class FilmsFilter extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsFilterTemplate(this._filters, this._currentFilter);
  }

  _filterChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(getUrlHash(evt.target.href));
  }

  setFilterChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .addEventListener('click', this._filterChangeHandler);
  }

  removeFilterChangeHandler(callback) {
    this._callback.filterTypeChange = null;
    this.getElement().removeEventListener('click', callback);
  }
}
