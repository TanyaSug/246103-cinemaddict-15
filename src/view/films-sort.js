import AbstractView from './abstract';

const createFilmsSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
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
    evt.preventDefault();
    this._callback.sortChange();
  }

  setSortChangeHandler(callback) {
    this._callback.sortChange = callback;
    this.getElement()
      .addEventListener('click', this._sortChangeHandler);
  }
}
