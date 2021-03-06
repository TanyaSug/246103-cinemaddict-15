import {renderElement, remove} from '../lib/render';
import {
  FILM_LIST_EMPTY_COMPONENT, FILM_STATISTIC,
  FILMS_LOADING, FILMS_PRESENTER, FILTER_PRESENTER,
  FilterType, FOOTER_STATISTICS_COMPONENT, MAIN_FILMS_CONTAINER,
  RenderPosition,
  StatsType,
  UpdateType,
  USER_STATUS_COMPONENT
} from '../lib/consts';
import UserStatusView from '../view/user-status';
import FilmsListEmptyView from '../view/film/films-list-empty';
import FilmsLoadingView from '../view/films-loading';
import FilmStatisticView from '../view/film-stats';
import FooterStatisticsView from '../view/footer-statistics';
import FilmsPresenter from './films-presenter';
import FilterPresenter from './filter-presenter';
import MainContainerView from '../view/film/main-container';
import {getFilmsByFilter} from '../lib/filter-stats-utils';


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

    this._onDataReceived = this._onDataReceived.bind(this);
    this._handleStatsFilterChange = this._handleStatsFilterChange.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleListLoaded = this._handleListLoaded.bind(this);

    this._filmsModel.addObserver(this._handleListLoaded);
    this._filterModel.addFilterChangedListener(this._handleFilterChange);
  }

  execute() {
    this._render();
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
    this._filmsPresenter = new FilmsPresenter(this._mainFilmsContainer, this._filmsModel, this._filterModel, this._api);
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
    if (this._filmStatistic !== null) {
      this._filmStatistic = null;
    }
    const filteredFilms = getFilmsByFilter(this._filmsModel.films, this._currentStatsFilter);
    this._filmStatistic = new FilmStatisticView(filteredFilms, this._currentStatsFilter);
    renderElement(this._mainFilmsContainer, this._filmStatistic, RenderPosition.BEFOREEND);
    this._filmStatistic.setStatsFilterElementsChangeHandler(this._handleStatsFilterChange);
    const activeClass = 'main-navigation__item--active';
    const statsElement = document.querySelector('.main-navigation__additional');
    statsElement.classList.add(activeClass);
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
    this._clearViewByName(USER_STATUS_COMPONENT);
    this._clearViewByName(FILMS_LOADING);
    this._clearViewByName(FILM_LIST_EMPTY_COMPONENT);
    this._clearViewByName(FILM_STATISTIC);
    this._clearViewByName(FOOTER_STATISTICS_COMPONENT);
    this._destroyPresenter(FILMS_PRESENTER);
    this._destroyPresenter(FILTER_PRESENTER);
    this._clearViewByName(MAIN_FILMS_CONTAINER);
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
}
