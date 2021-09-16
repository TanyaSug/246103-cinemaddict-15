import {
  remove,
  renderElement
} from '../lib/render';
import {
  FilterType,
  RenderPosition
} from '../lib/consts';
import {
  computeUserRating
} from '../lib/compute-user-rating';
// import FilmsPresenter from './films-presenter';
import UserStatusView from '../view/user-status';
import FilmsListEmptyView from '../view/film/films-list-empty';
import FilmsLoadingView from '../view/films-loading';
import FilmStatisticView from '../view/film-stats';
import FooterStatisticsView from '../view/footer-statistics';
import NewPresenter from './new-presenter';
import FilterPresenter from './filter-presenter';
import MainContainerView from '../view/film/main-container';


export default class MainPresenter {
  constructor(bodyContainer, filmsModel, filterModel) {
    this._container = bodyContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._userStatusComponent = null;
    this._mainFilmsContainer = new MainContainerView();
    this._filterPresenter = null;
    this._filmsPresenter = null;
    this._filmsLoading = null;
    this._filmListEmptyComponent = null;
    this._filmStatistic = null;
    this._footerStatisticsComponent = null;
    this._onDataReceived = this._onDataReceived.bind(this);
    this._sortOrder = null;
    this._filterBy = null;
    this._handleFilterChanged = this._handleFilterChanged.bind(this);
    this._filmsModel.addObserver(this._handleFilterChanged);

    this._filterModel.addFilterChangedListener(this._handleFilterChanged);
  }


  _renderUserStatus() {
    this._userStatusComponent = new UserStatusView(computeUserRating(this._filmsModel.films));
    renderElement(this._container, this._userStatusComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMainFilmsContainer() {
    renderElement(this._container, this._mainFilmsContainer, RenderPosition.BEFOREEND);
  }

  _renderFilterPresenter() {
    this._filterPresenter = new FilterPresenter(this._mainFilmsContainer, this._filterModel, this._filmsModel);
    this._filterPresenter.execute();
  }

  _renderFilmsPresenter() {
    this._filmsPresenter = new NewPresenter(this._mainFilmsContainer, this._filmsModel, this._filterModel);
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
    this._filmStatistic = new FilmStatisticView(this._filmsModel.films);
    renderElement(this._mainFilmsContainer, this._filmStatistic, RenderPosition.BEFOREEND);
  }

  _renderFooterStatistics() {
    this._footerStatisticsComponent = new FooterStatisticsView(this._filmsModel.films);
    renderElement(this._container, this._footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  _handleFilterChanged() {
    console.log(`to continue with new filter ${this._filterModel.getFilter()}`);
  }

  _clearViewByName(name) {
    if (this[name] !== null) {
      const view = this[name];
      this[name] = null;
      remove(view);
    }
  }

  _clearFilmsPresenter() {
    if (this._filmsPresenter !== null) {
      this._filmsPresenter.destroy();
      this._filmsPresenter = null;
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
    this._renderFilterPresenter();
    this._renderMainFilmsContainer();
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