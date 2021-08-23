import UserStatusView from '../view/user-status';
import SiteMenuView from '../view/site-menu';
import FilmFilterView from '../view/film-filter';
import FilmsListContainerView from '../view/film/film-list-container';
import ShowMoreButtonView from '../view/film-show-more-button';
import FilmCardTopRatedAndCommentedView from '../view/film/film-card-top-rated';
import FooterStatisticsView from '../view/footer-statistics';
import {
  renderElement,
  RenderPosition
} from '../lib/render';


export default class FilmsList {
  constructor(container, data) {
    this._container = container;
    this._filmListComponent = new FilmsListContainerView();
    this._userStatusComponent = new UserStatusView( /* user-rating */ );
    this._siteMenuComponent = new SiteMenuView();
    this._filmFilterComponent = new FilmFilterView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmCardTopRatedAndCommentedComponent = new FilmCardTopRatedAndCommentedView();
    this._footerStatisticsComponent = new FooterStatisticsView();
    this._data = data;
    this._originalData = data;
  }

  _renderUserStatus() {
    renderElement(this._container, this._userStatusComponent, RenderPosition.BEFOREEND);
  }

  _renderSiteMenu() {}

  _renderFilmFilter() {
    renderElement(this._container, this._filmFilterComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {}

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
      //нарисовать происходит загрузка
      return;
    }
    if (Array.isArray(this._data)) {
      if (this._data.length <= 0) {
        // нарисовать нет фильмов
        return
      }
      //нарисовать фильмы
    }
  }
  execute() {
    _render();
  }

}
