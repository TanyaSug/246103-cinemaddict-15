import UserStatusView from '../view/user-status';
// import FilmsFilterView from '../view/films-filter';
// import FilmsSortView from '../view/films-sort';
import FilmsListContainerView from '../view/film/films-list-container';
import ShowMoreButtonView from '../view/film-show-more-button';
import FilmCardTopRatedAndCommentedView from '../view/film/film-card-top-rated';
import FooterStatisticsView from '../view/footer-statistics';
import {renderElement} from '../lib/render';
import Film1CardView from '../view/film/film-card';
import FilmsListEmptyView from '../view/film/films-list-empty';
import FilmsLoadingView from '../view/films-loading';
import {RenderPosition} from '../lib/consts';
import {loadData} from '../api/load-data';
import {computeUserRating} from '../lib/compute-user-rating';
import FilmPopup from '../view/popup/film-popup';


export default class FilmsListPresenter {
  constructor(mainContainer, data) {
    this._container = mainContainer;
    this._data = data;
    this._originalData = data;
    this._userStatusComponent = null;
    this._filmsFilterComponent = null;
    this._filmsSortComponent = null;
    this._filmsLoading = new FilmsLoadingView();
    this._filmListComponent = null;
    // this._film1CardComponent = new Film1CardView();
    this._filmPopupComponent = null;
    this._filmListEmptyComponent = new FilmsListEmptyView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmCardTopRatedAndCommentedComponent = new FilmCardTopRatedAndCommentedView();
    this._footerStatisticsComponent = new FooterStatisticsView();
    this._onDataReceived = this._onDataReceived.bind(this);
  }


  _renderUserStatus() {
    this._userStatusComponent = new UserStatusView(computeUserRating(this._data));
    renderElement(this._container, this._userStatusComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsFilter() {}

  _renderFilmsSort() {
    renderElement(this._container, this._filmsSortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsLoading() {
    renderElement(this._container, this._filmsLoading, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    this._filmListComponent = new FilmsListContainerView(
      {data: this._data, onSelect: (film) => this._renderPopup(film), onSelcet1: (her) => method(her) });
    renderElement(this._container, this._filmListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm1Card() {}

  _renderFilmsListEmpty() {
    renderElement(this._container, this._filmListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {}

  _renderPopup(film) {
    this._filmPopupComponent = new FilmPopup(film);
    this._filmPopupComponent.appendPopUp();
  }


  _renderFilmCardTopRatedAndCommented() {}

  _renderFooterStatistics() {
    renderElement(this._container, this._footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  _onDataLoaded(data) {
    this._originalData = data;
    this._data;
    this. _render();
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

  _render(){
    if (this._data === undefined) {
      this._renderFilmsLoading();
      return;
    }

    if (Array.isArray(this._data)) {
      if (this._data.length <= 0) {
        this._renderFilmsListEmpty();
      } else {
        this._renderUserStatus();
        this._renderFilmsList();
        this._renderFooterStatistics();
      }
    }
  }

  _onDataReceived(data) {
    // this._clearContainer();
    this._data = data;
    this._render();
  }

  _beginLoadData() {
    loadData().then(this._onDataReceived).catch(() => undefined);
  }

  _method(value) {
    if(value === 'wat') {
      this._data = {};
    }
  }

  execute() {
    this._beginLoadData();
    this._render();
  }
}
