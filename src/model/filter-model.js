import AbstractObserver from '../abstract-observer';
import {FilterType} from '../lib/consts';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();

    this._activeFilter = FilterType.ALL;
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;

    this._notify(updateType, filter);
  }
}
