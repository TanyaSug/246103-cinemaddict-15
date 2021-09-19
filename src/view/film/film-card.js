import AbstractView from '../abstract';
import {
  createElement
} from '../../lib/render';
import {
  DESCRIPTION_LENGTH,
  FilmClickIds
} from '../../lib/consts';
import dayjs from 'dayjs';
import {
  getRuntime
} from '../../lib/get-duration-time';
const ACTIVE_CLASS = 'film-card__controls-item--active';


const createFilmCardTemplate = (filmData) => {
  const {
    filmInfo: {
      title,
      totalRating,
      releaseDate,
      genres,
      posters,
      description,
      commentsCount,
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
  } = filmData;
  const setDescriptionView = (filmDescription) => filmDescription.length <= DESCRIPTION_LENGTH ? filmDescription : `${filmDescription.slice(0, DESCRIPTION_LENGTH)}...`;
  const runTime = getRuntime(filmData.filmInfo.runtime);
  const favoriteClassName = favorite ? 'film-card__controls-item--active' : '';
  const watchlistClassName = watchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName = alreadyWatched ? 'film-card__controls-item--active' : '';
  return `<article class="film-card">
          <h3 class="film-card__title">${title || ''}</h3>
          <p class="film-card__rating">${totalRating || ''}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dayjs(releaseDate).format('YYYY') || ''}</span>
            <span class="film-card__duration">${runTime || ''}</span>
            <span class="film-card__genre">${genres || ''}</span>
          </p>
          <img src=${posters} alt="" class="film-card__poster">
          <p class="film-card__description">${setDescriptionView(description) || ''}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmData, {
    popupClick,
    watchedClick,
    favoritesClick,
    watchlistClick,
  }) {
    super();
    this._filmData = filmData;
    this._callback = {
      popupClick,
      watchedClick,
      favoritesClick,
      watchlistClick,
    };

    this._handlePopupPointClicks = this._handlePopupPointClicks.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  /*только для наследников*/getTemplate() {
    return createFilmCardTemplate(this._filmData);
  }

  /*только для наследников*/initializeElement(element) {
    this._initializePopupClickHandler(element);
    this._initializeWatchedClickHandler(element);
    this._initializeFavoritesClickHandler(element);
    this._initializeWatchlistClickHandler(element);
    return element;
  }

  _handlePopupPointClicks(evt) {
    evt.preventDefault();
    if (this._callback.popupClick) {
      this._callback.popupClick(FilmClickIds.POP_UP, this._filmData);
    } else {
      throw Error('popupClick does not exist in _callback');
    }
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(FilmClickIds.WATCHED, this._filmData);
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick(FilmClickIds.FAVORITES, this._filmData);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick(FilmClickIds.WATCH_LIST, this._filmData);
  }

  _initializePopupClickHandler(element) {

    const poster = element.querySelector('.film-card__poster');
    const title = element.querySelector('.film-card__title');
    const comments = element.querySelector('.film-card__comments');

    poster.addEventListener('click', this._handlePopupPointClicks);
    title.addEventListener('click', this._handlePopupPointClicks);
    comments.addEventListener('click', this._handlePopupPointClicks);
  }

  _initializeWatchedClickHandler(element){
    const watchedFilm = element.querySelector('.film-card__controls-item--mark-as-watched');
    watchedFilm.addEventListener('click', this._watchedClickHandler);
  }

  _initializeFavoritesClickHandler(element){
    const favoriteFilm = element.querySelector('.film-card__controls-item--favorite');
    favoriteFilm.addEventListener('click', this._favoritesClickHandler);
  }

  _initializeWatchlistClickHandler(element){
    const watchlistFilm = element.querySelector('.film-card__controls-item--add-to-watchlist');
    watchlistFilm.addEventListener('click', this._watchlistClickHandler);
  }


  _updateActiveClassBySelector(selector, flag) {
    const item = this.getElement().querySelector(selector);
    if (flag) {
      item.classList.add(ACTIVE_CLASS);
    } else {
      item.classList.remove(ACTIVE_CLASS);
    }
  }

}