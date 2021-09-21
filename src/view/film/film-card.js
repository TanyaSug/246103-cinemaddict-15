import AbstractView from '../abstract';
import {createElement} from '../../lib/render';
import {DESCRIPTION_LENGTH, FilmClickIds} from '../../lib/consts';
import dayjs from 'dayjs';
import {getRuntime} from '../../lib/get-duration-time';


export const createFilmCardTemplate = (filmData) => {
  const {filmInfo: {title, totalRating, release, genres, poster, description}, userDetails: {watchlist, alreadyWatched, favorite}} = filmData;
  const setDescriptionView = (filmDescription) => filmDescription.length <= DESCRIPTION_LENGTH ? filmDescription : `${filmDescription.slice(0, DESCRIPTION_LENGTH)}...`;
  const runTime = getRuntime(filmData.filmInfo.runtime);
  const favoriteClassName = favorite ? 'film-card__controls-item--active' : '';
  const watchlistClassName = watchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName = alreadyWatched ? 'film-card__controls-item--active' : '';
  return `<article class="film-card">
          <h3 class="film-card__title">${title || ''}</h3>
          <p class="film-card__rating">${totalRating || ''}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dayjs(release.date).format('YYYY') || ''}</span>
            <span class="film-card__duration">${runTime || ''}</span>
            <span class="film-card__genre">${genres ? genres.join(' ') : ''}</span>
          </p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${setDescriptionView(description) || ''}</p>
          <a class="film-card__comments">${filmData.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class  FilmCard extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;

    this._handlePopupPointClicks = this._handlePopupPointClicks.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmData);
  }
  //
  // _attachEventHandlers(element) {
  //   this.setPopupClickHandler(element);
  //   this.setFavoritesClickHandler(element);
  //   this.setWatchedClickHandler(element);
  //   this.setWatchlistClickHandler(element);
  // }

  _createElement() {
    // this._attachEventHandlers(result);
    return createElement(this.getTemplate());
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

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
    const poster =this.getElement().querySelector('.film-card__poster');
    const title = this.getElement().querySelector('.film-card__title');
    const comments = this.getElement().querySelector('.film-card__comments');

    poster.addEventListener('click', this._handlePopupPointClicks);
    title.addEventListener('click', this._handlePopupPointClicks);
    comments.addEventListener('click', this._handlePopupPointClicks);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    const watchedFilm = this.getElement().querySelector('.film-card__controls-item--mark-as-watched');
    watchedFilm.addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    const favoriteFilm = this.getElement().querySelector('.film-card__controls-item--favorite');
    favoriteFilm.addEventListener('click', this._favoritesClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    const watchlistFilm = this.getElement().querySelector('.film-card__controls-item--add-to-watchlist');
    watchlistFilm.addEventListener('click', this._watchlistClickHandler);
  }

  restoreHandlers() {
    this.setPopupClickHandler(this._callback.popupClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoritesClickHandler(this._callback.favoritesClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
  }

  updateElement(updatedFilmData) {
    this._filmData = updatedFilmData;
    super.updateElement();
  }
}
