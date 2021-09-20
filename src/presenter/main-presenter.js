import {renderElement, remove} from '../lib/render';
import {FilterType, RenderPosition, StatsType, UpdateType} from '../lib/consts';
import UserStatusView from '../view/user-status';
import FilmsListEmptyView from '../view/film/films-list-empty';
import FilmsLoadingView from '../view/films-loading';
import FilmStatisticView from '../view/film-stats';
import FooterStatisticsView from '../view/footer-statistics';
import NewPresenter from './new-presenter';
import FilterPresenter from './filter-presenter';
import MainContainerView from '../view/film/main-container';
import {getFilmsByFilter} from '../lib/user-statistics';


export default class MainPresenter {
  constructor(bodyContainer, filmsModel, filterModel, api) {
    this._container = bodyContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._userStatusComponent = null;
    this._mainFilmsContainer = null;
    this._filterPresenter = null;
    this._filmsPresenter = null;
    this._filmsLoading = null;
    this._filmListEmptyComponent = null;
    this._filmStatistic = null;
    this._footerStatisticsComponent = null;
    this._currentStatsFilter = StatsType.ALL_TIME;
    this._filtredFilms = null;
    this._onDataReceived = this._onDataReceived.bind(this);
    this._sortOrder = null;
    this._filterBy = null;
    this._handleStatsFilterChange = this._handleStatsFilterChange.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleListLoaded = this._handleListLoaded.bind(this);
    this._filmsModel.addObserver(this._handleListLoaded);
    this._filterModel.addFilterChangedListener(this._handleFilterChange);
  }

  _renderUserStatus() {
    this._userStatusComponent = new UserStatusView(this._filmsModel.films);
    renderElement(this._container, this._userStatusComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMainFilmsContainer() {
    this._mainFilmsContainer =  new MainContainerView();
    renderElement(this._container, this._mainFilmsContainer, RenderPosition.BEFOREEND);
  }

  _renderFilterPresenter() {
    this._filterPresenter = new FilterPresenter(this._mainFilmsContainer, this._filterModel, this._filmsModel);
    this._filterPresenter.execute();
  }

  _renderFilmsPresenter() {
    this._filmsPresenter = new NewPresenter(this._mainFilmsContainer, this._filmsModel, this._filterModel, this._api);
    this._filmsPresenter.execute();
  }

  _renderFilmsLoading() {
    this._filmsLoading = new FilmsLoadingView();
    renderElement(this._mainFilmsContainer, this._filmsLoading, RenderPosition.BEFOREEND);
  }

  _renderFilmsListEmpty() {
    this._filmListEmptyComponent = new FilmsListEmptyView(this._filterModel.getFilter());
    renderElement(this._mainFilmsContainer, this._filmListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsStatistics() {
    const filteredFilms = getFilmsByFilter(this._filmsModel.films, this._currentStatsFilter);
    this._filmStatistic = new FilmStatisticView(filteredFilms, this._currentStatsFilter);
    this._filmStatistic.setStatsFilterElementsChangeHandler(this._handleStatsFilterChange);
    renderElement(this._mainFilmsContainer, this._filmStatistic, RenderPosition.BEFOREEND);
  }

  _renderFooterStatistics() {
    this._footerStatisticsComponent = new FooterStatisticsView(this._filmsModel.films);
    renderElement(this._container, this._footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  _handleStatsFilterChange(value) {
    this._currentStatsFilter = value;
    const filteredFilms = getFilmsByFilter(this._filmsModel.films, this._currentStatsFilter);

    this._filmStatistic.updateData(
      {filteredFilms, currentFilter: this._currentStatsFilter},
    );
  }

  _handleFilterChange() {
    this._render();
  }

  _clearViewByName(name) {
    if (this[name] !== null) {
      const view = this[name];
      this[name] = null;
      remove (view);
    }
  }

  _handleListLoaded(type) {
    if (type === UpdateType.INIT) {
      this._render();
    }
  }

  _destroyPresenter(name) {
    if (this[name]) {
      const presenter = this[name];
      this[name] = null;
      presenter.destroy();
    }
  }

  _clearViews() {
    this._clearViewByName('_userStatusComponent');
    this._clearViewByName('_filmsLoading');
    this._clearViewByName('_filmListEmptyComponent');
    this._clearViewByName('_filmStatistic');
    this._clearViewByName('_footerStatisticsComponent');
    this._destroyPresenter('_filmsPresenter');
    this._destroyPresenter('_filterPresenter');
  }

  _renderList() {
    if (this._filmsModel.length <= 0) {
      this._renderFilmsListEmpty();
    } else {
      this._renderFilmsPresenter();
    }
  }

  _renderMain() {
    if (this._filterModel.getFilter() === FilterType.STATS) {
      this._renderFilmsStatistics();
    } else {
      this._renderList();
    }
  }

  _renderBusinessData() {
    if (!Array.isArray(this._filmsModel.films)) {
      this._renderFilmsLoading();
    } else {
      this._renderMain();
    }
  }

  _render() {
    this._clearViews();
    this._renderUserStatus();
    this._renderMainFilmsContainer();
    this._renderFilterPresenter();
    this._renderBusinessData();
    this._renderFooterStatistics();
  }

  _onDataReceived(films) {
    this._filmsModel.films = films;
    this._render();
  }


  execute() {
    this._render();
  }
}
