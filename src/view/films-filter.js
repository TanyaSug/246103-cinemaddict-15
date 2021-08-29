import AbstractView from './abstract';

const createFilmsFilterTemplate = (watchlistCount, historyCount, favoritesCount) => (
  `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item main-navigation__item--active">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
      </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
);

// let watchlistCount = 0;
// this._data.forEach((el) => {
//   watchlistCount += el.userDetails.watchlistCount;
// });
// let historyCount = 0;
// this._data.forEach((el) => {
//   historyCount += el.userDetails.alreadyWatched;
// });
// let favorite = 0;
// this._data.forEach((el) => {
//   favorite += el.userDetails.favorite;
// });

export default class FilmsFilter extends AbstractView {
  constructor(props) {
    const {watchlistCount, historyCount, favoritesCount} = props;
    super();
    this._watchlistCount = watchlistCount;
    this._historyCount = historyCount;
    this._favoritesCount = favoritesCount;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilmsFilterTemplate(this._watchlistCount, this._historyCount, this._favoritesCount);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterChange();
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement()
      .addEventListener('click', this._filterChangeHandler);
  }
}
