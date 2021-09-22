import AbstractObserver from '../abstract-observer';
import {FilterType} from '../lib/consts';
import {EventManager} from '../lib/event-manager';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
    this._filterChanged = new EventManager();
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(filter) {
    if (this._activeFilter === filter) {
      return;
    }
    this._activeFilter = filter;
    this._filterChanged.notify();
  }

  addFilterChangedListener(subscriber) {
    this._filterChanged.subscribe(subscriber);
  }
}
