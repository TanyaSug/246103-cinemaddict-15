import FilmsFilterView from '../view/films-filter';
import {FilterType, RenderPosition} from '../lib/consts';
import {remove, renderElement, replace} from '../lib/render';
import {filter} from '../lib/get-filters';


export default class FilterPresenter {
  constructor(container, filterModel, filmsModel) {
    this._filterContainer = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filterComponent = null;
    this._currentFilter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  execute() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilmsFilterView(filters, this._currentFilter);
    this._filterComponent.setFilterChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.execute();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(filterType);
  }

  _getFilters() {
    const films = this._filmsModel.films;
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  destroy() {
    if (this._filterComponent === null) {
      return;
    }
    this._filterComponent.removeFilterChangeHandler(this._handleFilterTypeChange);
    remove(this._filterComponent);
  }
}
