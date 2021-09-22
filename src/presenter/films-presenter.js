import {remove, renderElement} from '../lib/render';
import {
  RenderPosition,
  FILM_LIST_PAGE_SIZE,
  FilmClickIds,
  SortType,
  UserAction,
  UpdateType, FilterType
} from '../lib/consts';
import FilmsSortView from '../view/films-sort';
import FilmsListEmptyView from '../view/film/films-list-empty';
import FilmsContainerView from '../view/film/films-container';
import ShowMoreButtonView from '../view/film-show-more-button';
import PopupPresenter from './popup-presenter';
import {sortByDate, sortByRating} from '../utils';
import FilmCard from '../view/film/film-card';
import FilmsListContainerView from '../view/film/films-list-container';
import {getFilmsList} from '../lib/get-films-list';
import {filter} from '../lib/get-filters';


export default class FilmsPresenter {
  constructor(bodyContainer, filmsModel, filterModel, api) {
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._mainContainer = bodyContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._filterPresenter = null;
    this._filmsSortComponent = null;
    this._filmsContainer = null;
    this._filmsListComponent = null;
    this._listEmptyComponent = null;
    this._popupPresenter = null;
    this._currentSortType = SortType.BY_DEFAULT;
    this._filmsVisibleCount = FILM_LIST_PAGE_SIZE;
    this._showMoreButtonComponent = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmListMap = new Map();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.films;
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }
    return filteredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, filmData) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmListMap.get(filmData.id)
          .updateElement(filmData);
        break;

      case UpdateType.MINOR:
        this._filmListMap.get(filmData.id)
          .updateElement(filmData);
        this._popupPresenter.filmPopupInfoComponent &&
        this._popupPresenter.filmPopupInfoComponent.updateElement(filmData);
        break;

      case UpdateType.MAJOR:
        this._resetSort();
        this._clearFilms();
        this._renderFilmsContainer();
        this._renderFilmsList();
        this._renderShowMoreButton();
        // this._resetShowMoreButtonStartIndex();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilms();
    this._renderFilmsContainer();
    this._renderFilmsList();
    // this._resetShowMoreButtonStartIndex();
    this._renderShowMoreButton();
    this._filmsSortComponent.updateData({currentSortType: this._currentSortType});

  }

  _renderFilmsSort() {
    if (this._filmsSortComponent !== null) {
      remove(this._filmsSortComponent);
      this._filmsSortComponent = null;
    }
    this._filmsSortComponent = new FilmsSortView(this._currentSortType);
    this._filmsSortComponent.setSortChangeHandler(this._handleSortTypeChange);
    renderElement(this._mainContainer, this._filmsSortComponent, RenderPosition.BEFOREEND);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._filmsModel.films.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._filmsModel.films.sort(sortByRating);
        break;
      default:
        this._filmsModel.films = this._sourcedFilmsData;
    }
    this._currentSortType = sortType;
  }

  _renderFilmsContainer() {
    this._filmsContainer = new FilmsContainerView();
    renderElement(this._mainContainer, this._filmsContainer, RenderPosition.BEFOREEND);
  }

  _renderListEmpty() {
    this._listEmptyComponent = new FilmsListEmptyView(this._filterModel.getFilter());
    renderElement(this._filmsListComponent, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    const currentList =  this._getFilms();
    this._filmsListComponent = new FilmsListContainerView();
    renderElement(this._filmsContainer, this._filmsListComponent, RenderPosition.BEFOREEND);
    if(currentList.length > 0) {
      this._addFilms(currentList);
    } else {
      this._renderListEmpty();
    }
  }

  _addFilms(currentList) {
    const REAL_START_INDEX = 0;
    const REAL_COUNT = this._filmsVisibleCount;
    const innerPoint = this._filmsListComponent.getInnerPoint();
    getFilmsList(
      currentList,
      REAL_START_INDEX,
      REAL_COUNT)
      .map((film) => {
        const filmCard = new FilmCard(film);
        filmCard.setPopupClickHandler(this._handleFilmCardClick);
        filmCard.setWatchlistClickHandler(this._handleFilmCardClick);
        filmCard.setWatchedClickHandler(this._handleFilmCardClick);
        filmCard.setFavoritesClickHandler(this._handleFilmCardClick);
        this._filmListMap.set(film.id, filmCard);
        renderElement(innerPoint, filmCard, RenderPosition.BEFOREEND);
      });
  }


  _handleMoreButtonClick() {
    this._filmsVisibleCount += FILM_LIST_PAGE_SIZE;
    this._clearFilms();
    this._renderContainerWithButton();
    // const FILMS_QUANTITY = this._getFilms().length - this._filmsStartIndex;
    // const REST_OF_FILMS = FILMS_QUANTITY % FILM_LIST_PAGE_SIZE;
    //
    // if (this._filmsCount > 0 && this._filmsListComponent) {
    //   const count = this._filmsCount > REST_OF_FILMS ?
    //     FILM_LIST_PAGE_SIZE : REST_OF_FILMS;
    //
    //   this._addFilms(this._filmsStartIndex, count);
    //   this._filmsStartIndex += count;
    //   this._filmsCount -= count;
    //
    //   if (this._filmsCount <= 0) {
    //     remove(this._showMoreButtonComponent);
    //   }
    // }
  }

  _renderShowMoreButton() {
    if (this._getFilms().length > this._filmsVisibleCount && this._showMoreButtonComponent === null) {
      this._showMoreButtonComponent = new ShowMoreButtonView();
      renderElement(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
      this._showMoreButtonComponent.setButtonClickHandler(this._handleMoreButtonClick);
    }
  }

  _clearFilms() {
    this._filmListMap.forEach((film) => remove(film));
    this._filmListMap.clear();
    remove(this._filmsContainer);
    remove(this._listEmptyComponent);
    remove(this._showMoreButtonComponent);
  }

  _resetSort() {
    this._currentSortType = SortType.BY_DEFAULT;
    this._filmsSortComponent.updateData({currentSortType: this._currentSortType});
  }

  _executePopup(film) {
    this._api.getComments(film.id).then((comments) => {
      this._filmsModel.setComments(comments);
      return this._popupPresenter.execute(film, comments);
    });
  }


  _handleFilmCardClick(key, film, fromPopUp) {
    if (key === FilmClickIds.POP_UP) {
      return this._executePopup(film);
    }

    let updatedFilmData;
    if (key === FilmClickIds.WATCH_LIST) {
      updatedFilmData = {
        ...film,
        userDetails:  {...film.userDetails, watchlist: !film.userDetails.watchlist},
      };
    } else if (key === FilmClickIds.WATCHED) {
      updatedFilmData = {
        ...film,
        userDetails:  {...film.userDetails, alreadyWatched: !film.userDetails.alreadyWatched},
      };
    } else if (key === FilmClickIds.FAVORITES) {
      updatedFilmData = {
        ...film,
        userDetails:  {...film.userDetails, favorite: !film.userDetails.favorite},
      };
    }

    const filterType = this._filterModel.getFilter();
    let type = UpdateType.PATCH;
    if(!fromPopUp && filterType === FilterType.ALL) {
      type = UpdateType.PATCH;
    } else if (filterType === FilterType.FAVORITES && key === FilmClickIds.FAVORITES) {
      type = UpdateType.MAJOR;
    } else if (filterType === FilterType.WATCHLIST && key === FilmClickIds.WATCH_LIST) {
      type = UpdateType.MAJOR;
    } else if (filterType === FilterType.HISTORY && key === FilmClickIds.WATCHED) {
      type = UpdateType.MAJOR;
    } else if (fromPopUp) {
      type = UpdateType.MINOR;
    }

    this._api.updateFilm(updatedFilmData).then((filmData) => {
      this._filmsModel.updateFilm(type, filmData);
    });
  }

  _renderContainerWithButton() {
    this._renderFilmsContainer();
    this._renderFilmsList();
    this._renderShowMoreButton();
  }

  _render() {
    this._renderFilmsSort();
    this._renderContainerWithButton();
  }

  _clearViewByName(name) {
    if (this[name]) {
      const view = this[name];
      this[name] = null;
      remove(view);
    }
  }

  destroy() {
    this._clearViewByName('_filmsSortComponent');
    this._clearFilms();
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  execute() {
    this._sourcedFilmsData = this._filmsModel.films.slice();
    this._popupPresenter = new PopupPresenter((key, film) => this._handleFilmCardClick(key, film, true), this._handleViewAction, this._api);
    this._render();
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }
}
