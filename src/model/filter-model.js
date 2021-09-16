import AbstractObserver from '../abstract-observer';
import {
  FilterType,
  SortType
} from '../lib/consts';
import {
  EventManager
} from '../lib/event-manager';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
    this._activeSort = SortType.BY_DEFAULT;
    this._filterChanged = new EventManager();
    this._sortChanged = new EventManager();
  }

  getFilter() {
    return this._activeFilter;
  }

  getSort() {
    return this._activeSort;
  }

  setFilter(filter) {
    if(this._activeFilter === filter){
      return;
    }
    this._activeFilter = filter;
    this._filterChanged.notify();
  }

  setSort(sortType) {
    if(this._activeSort === sortType){
      return;
    }
    this._activeSort = sortType;
    this._sortChanged.notify();
  }

  addFilterChangedListener(subscriber) {
    this._filterChanged.subscribe(subscriber);
  }

  addSortChangedListener(subscriber) {
    this._sortChanged.subscribe(subscriber);
  }

  removeFilterChangedListener(subscriber) {
    this._filterChanged.unsubscribe(subscriber);
  }

  removeSortChangedListener(subscriber) {
    this._sortChanged.unsubscribe(subscriber);
  }
}
