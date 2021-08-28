import AbstractView from '../abstract';
import {createElement, replace} from '../../lib/render';
import {DESCRIPTION_LENGTH, FilmClickIds} from '../../lib/consts';
import dayjs from 'dayjs';


export const createFilmCardTemplate = (filmData) => {
  const {filmInfo: {title, totalRating, releaseDate, runtime, genres, posters, description, commentsCount}, userDetails: {watchlist, alreadyWatched, favorite}} = filmData;
  const setDescriptionView = (filmDescription) => filmDescription.length <= DESCRIPTION_LENGTH ? filmDescription : `${filmDescription.slice(0, DESCRIPTION_LENGTH)}...`;
  const favoriteClassName = favorite ? 'film-card__controls-item--active' : '';
  const watchlistClassName = watchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName = alreadyWatched ? 'film-card__controls-item--active' : '';
  return `<article class="film-card">
          <h3 class="film-card__title">${title || ''}</h3>
          <p class="film-card__rating">${totalRating || ''}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dayjs(releaseDate).format('YYYY')} || ''}</span>
            <span class="film-card__duration">${runtime || ''}</span>
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

export default class  FilmCard extends AbstractView {
  constructor(props) {
    const {...filmData} = props;
    super();
    this._filmData = filmData;
    // this._onClick = onClick;
    this._handleHotPointClicks = this._handleHotPointClicks.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmData);
  }

  _handleHotPointClicks(evt) {
    evt.preventDefault();
    if (this._callback.popupClick) {
      this._callback.popupClick();
    } else {
      throw Error('popupClick does not exist in _callback');
    }
  }

  _attachEventHandlers(element) {
    const poster = element.querySelector('.film-card__poster');
    const title = element.querySelector('.film-card__title');
    const comments = element.querySelector('.film-card__comments');

    poster.addEventListener('click', this._handleHotPointClicks);
    title.addEventListener('click', this._handleHotPointClicks);
    comments.addEventListener('click', this._handleHotPointClicks);
  }

  _createElement() {
    const result = createElement(this.getTemplate());
    this._attachEventHandlers(result);
    return result;
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
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

  clearListeners() {
    if(this._element && Object.keys(this._callback).length > 0) {
      this._element.removeEventListener('click', this._callback.popupClick);
      this._element.removeEventListener('click', this._callback.favoritesClick);
      this._element.removeEventListener('click', this._callback.watchlistClick);
      this._element.removeEventListener('click', this._callback.watchedClick);
    } else {
      throw Error('Element is not found');
    }
  }

  updateElement(newFilmClass, updatedFilmData, handler) {
    this.clearListeners();

    this._filmData = updatedFilmData;
    newFilmClass.setPopupClickHandler(() => handler(FilmClickIds.POP_UP, updatedFilmData));
    newFilmClass.setFavoritesClickHandler(() => handler(FilmClickIds.FAVORITES, updatedFilmData));
    newFilmClass.setWatchlistClickHandler(() => handler(FilmClickIds.WATCH_LIST, updatedFilmData));
    newFilmClass.setWatchedClickHandler(() => handler(FilmClickIds.WATCHED, updatedFilmData));

    replace(newFilmClass, this);
  }
}
