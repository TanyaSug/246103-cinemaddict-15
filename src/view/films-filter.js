import Abstract from './abstract';


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
// const createFilmsFilterTemplate = (currentFilterType) => (
//   `<nav class="main-navigation">
//       <div class="main-navigation__items">
//         <a href="#all" class="main-navigation__item ${(currentFilterType === FilterType.ALL) || !currentFilterType ? activeFilter : ''}" data-filter-type="${FilterType.ALL}">All movies</a>
//         <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? activeFilter : ''}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
//         <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? activeFilter : ''}" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${historyCount}</span></a>
//         <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? activeFilter : ''}" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
//       </div>
//         <a href="#stats" class="main-navigation__additional">Stats</a>
//     </nav>`
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
    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .addEventListener('click', this._filterChangeHandler);
  }
}
