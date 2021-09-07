import {loadData} from '../api/load-data';
import {renderElement} from '../lib/render';
import {RenderPosition} from '../lib/consts';
import {computeUserRating} from '../lib/compute-user-rating';
// import FilmsPresenter from './films-presenter';
import UserStatusView from '../view/user-status';
import FilmsListEmptyView from '../view/film/films-list-empty';
import FilmsLoadingView from '../view/films-loading';
import FooterStatisticsView from '../view/footer-statistics';
import NewPresenter from './new-presenter';


export default class MainPresenter {
  constructor(bodyContainer, data) {
    this._container = bodyContainer;
    this._data = data;
    this._originalData = data;
    this._userStatusComponent = null;
    this._filmsPresenter = null;
    this._filmsLoading = null;
    this._filmListEmptyComponent = null;
    this._footerStatisticsComponent = null;
    this._onDataReceived = this._onDataReceived.bind(this);
    this._sortOrder = null;
    this._filterBy = null;
  }


  _renderUserStatus() {
    this._userStatusComponent = new UserStatusView(computeUserRating(this._data));
    renderElement(this._container, this._userStatusComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsPresenter() {
    this._filmsPresenter = new NewPresenter(this._container, this._data);
    this._filmsPresenter.execute(this._data);
  }

  _renderFilmsLoading() {
    this._filmsLoading = new FilmsLoadingView();
    renderElement(this._container, this._filmsLoading, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsListEmpty() {
    this._filmListEmptyComponent = new FilmsListEmptyView();
    renderElement(this._container, this._filmListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderFooterStatistics() {
    this._footerStatisticsComponent = new FooterStatisticsView();
    renderElement(this._container, this._footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  _onDataLoaded(data) {
    this._originalData = data;
    this._data;
    this._render();
  }

  // _sortByRating() {
  //   const newData = this._originalData.sort(compareByRating);
  //   this._data = newData;
  //   this. _render();
  // }

  // _filterByWatched() {
  //   const newData = this._originalData.filter(isWitched);
  //   this._data = newData;
  //   this. _render();
  // }

  _clearViewByName() {
    if(this[name] !== null) {
      const view = this[name];
      this[name] = null;
      return view;
    }
  }

  _clearFilmsPresenter() {
    if(this._filmsPresenter !== null) {
      this._filmsPresenter.destroy();
      this._filmsPresenter = null;
    }
  }

  _clearViews() {
    this._clearViewByName('_userStatusComponent');
    this._clearViewByName('_filmsLoading');
    this._clearViewByName('_filmListEmptyComponent');
    this._clearViewByName('_footerStatisticsComponent');
  }

  _render() {
    this._clearViews();
    if (this._data === undefined) {
      this._renderFilmsLoading();
      return;
    }

    if (Array.isArray(this._data)) {
      if (this._data.length <= 0) {
        this._renderFilmsListEmpty();
      } else {
        this._renderFooterStatistics();
        this._renderFilmsPresenter();
        this._renderUserStatus();
      }
    }
  }

  // _render() {
  //   this._clearViews();
  //   if (this._data === undefined) {
  //     this._renderUserStatus();
  //     this._renderFilmsLoading();
  //     this._renderFooterStatistics();
  //     return;
  //   }
  //
  //   if (Array.isArray(this._data)) {
  //     if (this._data.length <= 0) {
  //       this._renderFilmsListEmpty();
  //     } else {
  //       this._renderFooterStatistics();
  //       this._renderFilmsPresenter();
  //       this._renderUserStatus();
  //     }
  //   }
  // }

  _onDataReceived(data) {
    // this._clearContainer();
    this._originalData = data;
    this._data = data;
    this._render();
  }

  _beginLoadData() {
    loadData().then(this._onDataReceived).catch(() => undefined);
  }

  execute() {
    this._beginLoadData();
    this._render();
  }
}
