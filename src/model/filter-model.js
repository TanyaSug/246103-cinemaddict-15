import AbstractObserver from '../abstract-observer';
import {FilterType, SortType, UpdateType} from '../lib/consts';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
    this._activeSort = SortType.BY_DEFAULT;
  }

  getFilter() {
    return this._activeFilter;
  }

  getSort(){
    return this._activeSort;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._notify(UpdateType.MAJOR, filter);
  }

  setSort(sortType){
    this._activeSort = sortType;
    this._notify(UpdateType.PATCH);
  }
}
