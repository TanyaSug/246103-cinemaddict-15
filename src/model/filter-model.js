import AbstractObserver from '../abstract-observer';
import {FILM_LIST_PAGE_SIZE, FilterType, SortType, StatsType} from '../lib/consts';
import {EventManager} from '../lib/event-manager';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
    this._activeSort = SortType.BY_DEFAULT;
    this._filmCount = FILM_LIST_PAGE_SIZE;
    // this._statsType = StatsType.ALL_TIME;

    this._filterChanged = new EventManager();
    // this._sortChanged = new EventManager();
    // this._countChanged = new EventManager();
    // this._statsChanged = new EventManager();
  }

  getFilter() {
    return this._activeFilter;
  }
  //
  // getSort() {
  //   return this._activeSort;
  // }
  //
  // getFilmCount () {
  //   return this._filmCount;
  // }
  //
  // getStatsType(){
  //   return this._statsType;
  // }

  setFilter(filter) {
    if (this._activeFilter === filter) {
      return;
    }
    this._activeFilter = filter;
    this._activeSort = SortType.BY_DEFAULT;
    this._filmCount = FILM_LIST_PAGE_SIZE;
    this._filterChanged.notify();
  }

  // setSort(sortType) {
  //   if (this._activeSort === sortType) {
  //     return;
  //   }
  //   this._activeSort = sortType;
  //   this._filmCount = FILM_LIST_PAGE_SIZE;
  //   this._sortChanged.notify();
  // }
  //
  // setStatsType (statsType){
  //   this._statsType = statsType;
  //   this._statsChanged.notify();
  // }

  addFilterChangedListener(subscriber) {
    this._filterChanged.subscribe(subscriber);
  }
}
