import AbstractView from '../abstract';
import dayjs from 'dayjs';
import {FilmClickIds} from '../../lib/consts';
import {getRuntime} from '../../lib/get-duration-time';


const makeActiveClassName = (flag) => flag ? 'film-details__control-button--active' : '';

const createGenresTemplate = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(' ');


const createFilmPopupTemplate = (filmData) => {
  const genreTitle = filmData.filmInfo.genres.length > 1 ? 'Genres' : 'Genre';
  const genresList = createGenresTemplate(filmData.filmInfo.genres);
  const runTime = getRuntime(filmData.filmInfo.runtime);
  return `<div class="film-details__top-container">
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${filmData.filmInfo.poster} alt="">

          <p class="film-details__age">${filmData.filmInfo.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmData.filmInfo.title}</h3>
              <p class="film-details__title-original">${filmData.filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmData.filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmData.filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmData.filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmData.filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(filmData.filmInfo.release.date).format('YYYY/MM/DD')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmData.filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreTitle}</td>
              <td class="film-details__cell">
              ${genresList}
                </td>
            </tr>
          </table>

          <p class="film-details__film-description">
         ${filmData.filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${makeActiveClassName(filmData.userDetails.watchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${makeActiveClassName(filmData.userDetails.alreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${makeActiveClassName(filmData.userDetails.favorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>`;
};

export default class PopupFilmInfo extends AbstractView{
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(FilmClickIds.WATCHED, this._filmData);
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick(FilmClickIds.FAVORITES,this._filmData);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick(FilmClickIds.WATCH_LIST, this._filmData);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    const watchedFilm = this.getElement().querySelector('#watched');
    watchedFilm.addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    const favoriteFilm = this.getElement().querySelector('#favorite');
    favoriteFilm.addEventListener('click', this._favoritesClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    const watchlistFilm = this.getElement().querySelector('#watchlist');
    watchlistFilm.addEventListener('click', this._watchlistClickHandler);
  }


  getTemplate() {
    return createFilmPopupTemplate(this._filmData);
  }

  restoreHandlers() {
    this.setFavoritesClickHandler(this._callback.favoritesClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
  }

  updateElement(updatedFilmData) {
    this._filmData = updatedFilmData;
    super.updateElement();
  }
}

