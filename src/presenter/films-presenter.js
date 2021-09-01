import {remove, renderElement, replace} from '../lib/render';
import {RenderPosition, FILMS_COUNT, FilmClickIds} from '../lib/consts';
import MainContainerView from '../view/film/main-container';
import FilmsFilterView from '../view/films-filter';
import FilmsSortView from '../view/films-sort';
import FilmsContainerView from '../view/film/films-container';
import FilmsListView from '../view/film/films-list';
import ShowMoreButtonView from '../view/film-show-more-button';
// import FilmCardTopRatedView from '../view/film/film-card-top-rated';
// import FilmCardMostCommentedView from '../view/film/film-card-most-commented';
import FilmPopupView from '../view/popup/film-popup';
import PopupPresenter from './popup-presenter';
import {updateItem} from '../utils';
import {createSiteMenuMock} from '../mock/create-site-menu-mock';
// import FilmCard from '../view/film/film-card';


export default class FilmsPresenter {
  constructor(bodyContainer, filmsData) {
    this._mainContainer = new MainContainerView();
    this._filmsData = filmsData;
    this._bodyContainer = bodyContainer;
    this._filmsFilterComponent = null;
    this._filmsSortComponent = null;
    this._filmsContainer = null;
    this._filmListComponent = null;
    this._popupPresenter = null;
    this._filmPopupComponent = null;
    this._filmCardTopRatedComponent = null;
    this._filmCardMostCommentedComponent = null;
    this._filmCardComponent = null;
    this._filmsStartIndex = FILMS_COUNT;
    this._filmsCount = this._filmsData.length - FILMS_COUNT;
    this._showMoreButtonComponent = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);

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

  _renderFilmsSort() {
    this._filmsSortComponent = new FilmsSortView();
    renderElement(this._mainContainer, this._filmsSortComponent, RenderPosition.BEFOREEND);
    this._filmsSortComponent.setSortChangeHandler(this._handleSortTypeChange());
  }

  _renderFilmsContainer() {
    this._filmsContainer = new FilmsContainerView();
    renderElement(this._mainContainer, this._filmsContainer, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    this._filmListComponent = new FilmsListView(
      {
        data: this._filmsData,
        onSelect: (key, film) => this._handleFilmCardClick(key, film),
        onRender: (id, film) => this._filmListMap.set(id, film)},
    );
    renderElement(this._filmsContainer, this._filmListComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange() {}

  _handleMoreButtonClick() {
    const FILMS_QUANTITY = this._filmsData.length - this._filmsStartIndex;
    const REST_OF_FILMS = FILMS_QUANTITY % FILMS_COUNT;

    if (this._filmsCount > 0 && this._filmListComponent) {
      const count = this._filmsCount > REST_OF_FILMS
        ? FILMS_COUNT : REST_OF_FILMS;

      this._filmListComponent.addMoreFilms(this._filmsStartIndex, count);
      this._filmsStartIndex += count;

      this._filmsCount -= count;

      if (this._filmsCount === 0) {
        remove(this._showMoreButtonComponent);
      }
    }
  }

  _renderShowMoreButton() {
    this._showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setButtonClickHandler(this._handleMoreButtonClick);
  }

  // _renderFilmCardTopRated() {
  //   this._filmCardTopRatedComponent = new FilmCardTopRatedView(this._filmsData);
  //   renderElement(this._filmsContainer, this._filmCardTopRatedComponent, RenderPosition.BEFOREEND);
  // }

  // _renderFilmCardMostCommented() {
  //   this._filmCardMostCommentedComponent = new FilmCardMostCommentedView(this._filmsData);
  //   renderElement(this._filmsContainer, this._filmCardMostCommentedComponent, RenderPosition.BEFOREEND);
  // }

  _renderPopup(selectedFilm) {
    const prevFilmPopup = this._filmPopupComponent;
    this._filmPopupComponent = new FilmPopupView(selectedFilm);

    this._filmPopupComponent.setFavoritesClickHandler((updatedFilm) => this._handleFilmCardClick(FilmClickIds.FAVORITES, updatedFilm));
    this._filmPopupComponent.setWatchlistClickHandler((updatedFilm) => this._handleFilmCardClick(FilmClickIds.WATCH_LIST, updatedFilm));
    this._filmPopupComponent.setWatchedClickHandler((updatedFilm) => this._handleFilmCardClick(FilmClickIds.WATCHED, updatedFilm));

    if (prevFilmPopup === null) {
      return this._filmPopupComponent.appendPopUp();
    }
    if(document.body.contains(prevFilmPopup.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopup);
    }
    this._filmPopupComponent.appendPopUp();
    remove(prevFilmPopup);
  }

  destroy() {
    remove(this._filmPopupComponent);
  }

  // _renderFilmCard() {
  //   this._filmCardComponent = new FilmCardView(this._filmsData);
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
    this._filmListMap.forEach((element) => remove(element));
    this._filmListMap.clear();
    remove(this._showMoreButtonComponent);
  }

  _handleFilmCardClick(key, film) {
    if (key === FilmClickIds.POP_UP) {
      return this._renderPopup(film);
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
    // const newFilmClass = new FilmCard(updatedFilmData);

    this._filmListMap.get(updatedFilmData.id)
      // .updateElement(newFilmClass, updatedFilmData, this._handleFilmCardClick);
      .updateElement(key, updatedFilmData);

    if (this._filmPopupComponent && document.body.contains(this._filmPopupComponent.getElement())) {
      this._filmPopupComponent.updateElement(key, updatedFilmData);
    }

    // this._filmListMap.set(updatedFilmData.id, newFilmClass);
  }

  _render() {
    this._renderMainContainer();
    this._renderFilmsFilter();
    this._renderFilmsSort();
    this._renderFilmsContainer();
    this._renderFilmsList();
    this._renderShowMoreButton();
    // this._renderFilmCardTopRated();
    // this._renderFilmCardMostCommented();

  }

  execute() {
    this._render();
  }
}
