import {remove, renderElement} from '../lib/render';
import {RenderPosition, FILM_LIST_PAGE_SIZE , FilmClickIds, SortType, Extra} from '../lib/consts';
import MainContainerView from '../view/film/main-container';
import FilmsFilterView from '../view/films-filter';
import FilmsSortView from '../view/films-sort';
import FilmsContainerView from '../view/film/films-container';
// import FilmsListView from '../view/film/films-list';
import ShowMoreButtonView from '../view/film-show-more-button';
import PopupPresenter from './popup-presenter';
import {getSortedByRating, sortByDate, updateItem} from '../utils';
import {createSiteMenuMock} from '../mock/create-site-menu-mock';
// import {getMostCommented} from '../lib/most-commented';
// import {getTopRated} from '../lib/get-top-rated';
import FilmCard from '../view/film/film-card';
import ExtraFilms from '../view/film/extra-films';
import FilmsListContainerView from '../view/film/films-list-container';
import {getFilmsList} from '../lib/get-films-list';
// import {computeUserRating} from '../lib/compute-user-rating';

export default class NewPresenter {
  constructor(bodyContainer, filmsData) {
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._mainContainer = new MainContainerView();
    this._filmsData = filmsData;
    this._bodyContainer = bodyContainer;
    this._filmsFilterComponent = null;
    this._filmsSortComponent = null;
    this._filmsContainer = null;
    this._filmsListComponent = null;
    // this._popupPresenter = null;
    this._popupPresenter = new PopupPresenter(this._handleFilmCardClick);
    this._filmCardTopRatedComponent = null;
    this._filmCardMostCommentedComponent = null;
    this._currentSortType = SortType.BY_DEFAULT;
    this._filmCardComponent = null;
    this._filmsStartIndex = FILM_LIST_PAGE_SIZE;
    this._filmsCount = this._filmsData.length - FILM_LIST_PAGE_SIZE;
    this._showMoreButtonComponent = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    // this._handleFilmCardClick = this._handleFilmCardClick.bind(this);


    this._filmListMap = new Map();
    this._filmTopRatedListMap = new Map();
    this._filmMostCommentedListMap = new Map();
  }


  _renderMainContainer() {
    renderElement(this._bodyContainer, this._mainContainer, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsFilter() {
    this._filmsFilterComponent = new FilmsFilterView(createSiteMenuMock(this._filmsData));
    renderElement(this._mainContainer, this._filmsFilterComponent, RenderPosition.AFTERBEGIN);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsContainer();
    this._renderFilmsList();
    this._renderShowMoreButton();
    this._renderFilmCardTopRated();
    this._renderFilmCardMostCommented();

  }
  // this._filmsSortComponent.updateData(this._currentSortType);

  _renderFilmsSort() {
    this._filmsSortComponent = new FilmsSortView(this._currentSortType);
    renderElement(this._mainContainer, this._filmsSortComponent, RenderPosition.BEFOREEND);
    this._filmsSortComponent.setSortChangeHandler(this._handleSortTypeChange);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._filmsData.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._filmsData.sort(getSortedByRating);
        break;
      default:
        this._filmsData = this._sourcedFilmsData.slice();
    }
    this._currentSortType = sortType;
  }

  _renderFilmsContainer() {
    this._filmsContainer = new FilmsContainerView();
    renderElement(this._mainContainer, this._filmsContainer, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    this._filmsListComponent = new FilmsListContainerView();
    renderElement(this._filmsContainer, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._addFilms(this._filmsStartIndex, FILM_LIST_PAGE_SIZE);
  }

  _addFilms(starIndex, count) {
    const innerPoint = this._filmsListComponent.getInnerPoint();
    getFilmsList(this._filmsData, starIndex, count).map((film) => {
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
    const FILMS_QUANTITY = this._filmsData.length - this._filmsStartIndex;
    const REST_OF_FILMS = FILMS_QUANTITY % FILM_LIST_PAGE_SIZE ;

    if (this._filmsCount > 0 && this._filmsListComponent) {
      const count = this._filmsCount > REST_OF_FILMS
        ? FILM_LIST_PAGE_SIZE  : REST_OF_FILMS;

      this._addFilms(this._filmsStartIndex, count);
      this._filmsStartIndex += count;

      this._filmsCount -= count;

      if (this._filmsCount === 0) {
        remove(this._showMoreButtonComponent);
      }
    }
  }

  _renderShowMoreButton() {
    this._showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setButtonClickHandler(this._handleMoreButtonClick);
  }

  _renderFilmCardTopRated() {
    const {filter, heading} = Extra.topRated;
    this._filmCardTopRatedComponent = new ExtraFilms(heading);
    const innerPoint = this._filmCardTopRatedComponent.getInnerPoint();
    filter(this._filmsData).map((film) => {
      const filmCard = new FilmCard(film);
      filmCard.setWatchlistClickHandler(this._handleFilmCardClick);
      filmCard.setWatchedClickHandler(this._handleFilmCardClick);
      filmCard.setFavoritesClickHandler(this._handleFilmCardClick);
      filmCard.setPopupClickHandler(this._handleFilmCardClick);
      renderElement(innerPoint, filmCard, RenderPosition.BEFOREEND);
      this._filmTopRatedListMap.set(film.id, filmCard);
    });
    renderElement(this._filmsContainer, this._filmCardTopRatedComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCardMostCommented() {
    const {filter, heading} = Extra.mostCommented;
    this._filmCardMostCommentedComponent = new ExtraFilms(heading);
    const innerPoint = this._filmCardMostCommentedComponent.getInnerPoint();
    filter(this._filmsData).map((film) => {
      const filmCard = new FilmCard(film);
      filmCard.setWatchlistClickHandler(this._handleFilmCardClick);
      filmCard.setWatchedClickHandler(this._handleFilmCardClick);
      filmCard.setFavoritesClickHandler(this._handleFilmCardClick);
      filmCard.setPopupClickHandler(this._handleFilmCardClick);
      renderElement(innerPoint, filmCard, RenderPosition.BEFOREEND);
      this._filmMostCommentedListMap.set(film.id, filmCard);
    });
    renderElement(this._filmsContainer, this._filmCardMostCommentedComponent, RenderPosition.BEFOREEND);
  }

  // _renderFilmCardTopRated() {
  //   this._filmCardTopRatedComponent = new ExtraFilms(this._filmsData);
  //   const innerPoint = this._filmCardTopRatedComponent.getInnerPoint();
  //   this._filmsData
  //     .sort((filmA, filmB) => filmA.filmInfo.totalRating - filmB.filmInfo.totalRating)
  //     .slice(0, 2)
  //     .map((film) => {
  //       const filmCard = new FilmCard(film);
  //       filmCard.setWatchlistClickHandler(this._handleFilmCardClick);
  //       filmCard.setWatchedClickHandler(this._handleFilmCardClick);
  //       filmCard.setFavoritesClickHandler(this._handleFilmCardClick);
  //       filmCard.setPopupClickHandler(this._handleFilmCardClick);
  //       renderElement(innerPoint, filmCard, RenderPosition.BEFOREEND);
  //       this._filmTopRatedListMap.set(film.id, filmCard);
  //     });
  //   renderElement(this._filmsContainer, this._filmCardTopRatedComponent, RenderPosition.BEFOREEND);
  // }
  //
  // _renderFilmCardMostCommented() {
  //   this._filmCardMostCommentedComponent = new ExtraFilms(this._filmsData);
  //   const innerPoint = this._filmCardMostCommentedComponent.getInnerPoint();
  //   this._filmsData
  //     .slice(0, 2)
  //     .map((film) => {
  //       const filmCard = new FilmCard(film);
  //       filmCard.setWatchlistClickHandler(this._handleFilmCardClick);
  //       filmCard.setWatchedClickHandler(this._handleFilmCardClick);
  //       filmCard.setFavoritesClickHandler(this._handleFilmCardClick);
  //       filmCard.setPopupClickHandler(this._handleFilmCardClick);
  //       renderElement(innerPoint, filmCard, RenderPosition.BEFOREEND);
  //       this._filmMostCommentedListMap.set(film.id, filmCard);
  //     });
  //   renderElement(this._filmsContainer, this._filmCardMostCommentedComponent, RenderPosition.BEFOREEND);
  // }

  _clearTopRatedList() {
    this._filmTopRatedListMap.forEach((element) => remove(element));
    this._filmTopRatedListMap.clear();
    remove(this._filmCardTopRatedComponent);
  }

  _clearMostCommentedList() {
    this._filmMostCommentedListMap.forEach((element) => remove(element));
    this._filmMostCommentedListMap.clear();
    remove(this._filmCardMostCommentedComponent);
  }

  _clearFilmsList() {
    this._filmListMap.forEach((film) => remove(film));
    this._filmListMap.clear();
    this._clearTopRatedList();
    this._clearMostCommentedList();
    remove(this._filmsContainer);
    remove(this._showMoreButtonComponent);
  }


  _handleFilmCardClick(key, film) {
    if (key === FilmClickIds.POP_UP) {
      return this._popupPresenter.execute(film);
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
    return this._handleFilmCardChange(key, updatedFilmData);
  }

  _handleFilmCardChange(key, updatedFilmData) {
    this._filmsData = updateItem(this._filmsData, updatedFilmData);

    this._filmListMap.get(updatedFilmData.id)
      .toggleUserControls(key, updatedFilmData);

    const popup = document.querySelector('.film-details');
    if (this._popupPresenter && popup) {
      this._popupPresenter.toggleUserControls(key, updatedFilmData);
    }

  }

  _render() {
    this._renderMainContainer();
    this._renderFilmsFilter();
    this._renderFilmsSort();
    this._renderFilmsContainer();
    this._renderFilmsList();
    this._renderShowMoreButton();
    this._renderFilmCardTopRated();
    this._renderFilmCardMostCommented();

  }

  destroy() {
    remove(this._filmCardComponent);
  }

  execute(filmsData) {
    this._filmsData = filmsData.slice();
    this._sourcedFilmsData = filmsData.slice();
    this._render();
  }
}
