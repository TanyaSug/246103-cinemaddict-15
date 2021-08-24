import UserStatusView from '../view/user-status';
import SiteMenuView from '../view/site-menu';
import FilmFilterView from '../view/film-filter';
import FilmsListContainerView from '../view/film/film-list-container';
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


export default class FilmsListPresenter {
  constructor(container, data) {
    this._container = container;
    this._userStatusComponent = new UserStatusView(computeUserRating(this._data));
    this._siteMenuComponent = new SiteMenuView();
    this._filmFilterComponent = new FilmFilterView();
    this._filmsLoading = new FilmsLoadingView();
    this._filmListComponent = new FilmsListContainerView();
    this._film1CardComponent = new Film1CardView();
    this._filmListEmptyComponent = new FilmsListEmptyView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmCardTopRatedAndCommentedComponent = new FilmCardTopRatedAndCommentedView();
    this._footerStatisticsComponent = new FooterStatisticsView();
    this._data = data;
    this._originalData = data;
    this._onDataReceived = this._onDataReceived.bind(this);
  }


  _renderUserStatus() {
    renderElement(this._container, this._userStatusComponent, RenderPosition.BEFOREEND);
  }

  _renderSiteMenu() {}

  _renderFilmFilter() {
    renderElement(this._container, this._filmFilterComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsLoading() {
    renderElement(this._container, this._filmsLoading, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    renderElement(this._container, this._filmListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm1Card() {}

  _renderFilmsListEmpty() {
    renderElement(this._container, this._filmListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {}

  _renderFilmCardTopRatedAndCommented() {}

  _renderFooterStatistics() {
    renderElement(this._container, this._footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  _onDataLoaded(data){
    this._originalData = data;
    this._data;
    this. _render();
  }

  _sortByRating(){
    const newData = this._originalData.sort(compareByRating);
    this._data = newData;
    this. _render();
  }

  _filterByWatched(){
    const newData = this._originalData.filter(isWitched);
    this._data = newData;
    this. _render();
  }

  _render(){
    if (this._data === null) {
      this._renderFilmsLoading();
      return;
    }
    if (Array.isArray(this._data)) {
      if (this._data.length <= 0) {
        this._renderFilmsListEmpty();
      }
      //нарисовать фильмы
    }
  }

  _onDataReceived(data) {
    this._clearContainer();
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
