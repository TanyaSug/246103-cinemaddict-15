import AbstractView from '../abstract';
import dayjs from 'dayjs';
import {FilmClickIds} from '../../lib/consts';


const makeActiveClassName = (flag) => flag ? 'film-details__control-button--active' : '';

const createFilmPopupTemplate = (filmData) => (
  `<section class="film-details"><form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${filmData.filmInfo.posters} alt="">

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
              <td class="film-details__cell">${dayjs(filmData.filmInfo.releaseDate).format('YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmData.filmInfo.runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmData.filmInfo.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre</td>
              <td class="film-details__cell">
              <span class="film-details__genre">${filmData.filmInfo.genres}</span>
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
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmData.filmInfo.commentsCount}</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">Interesting setting and a good cast</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Tim Macoveev</span>
                <span class="film-details__comment-day">2019/12/31 23:59</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">Booooooooooring</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
            </span>
            <div>
              <p class="film-details__comment-text">Very very old. Meh</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
            </span>
            <div>
              <p class="film-details__comment-text">Almost two hours? Seriously?</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">Today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
  </section>`
);

export default class FilmPopup extends AbstractView{
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this.removePopUp = this.removePopUp.bind(this);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(this._filmData);
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick(this._filmData);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick(this._filmData);
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

  getElement() {
    if (!this._element) {
      this._element = this._createElement();
    }
    return this._element;
  }

  _onEscKeyDown(evt)  {
    if ( evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.removePopUp();
    }
  }

  appendPopUp() {
    document.body.appendChild(this.getElement());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    document.querySelector('.film-details__close-btn')
      .addEventListener('click', this.removePopUp);
  }

  removePopUp() {
    if (this._element) {
      this.clearListeners();
      document.body.removeChild(this._element);
      document.body.classList.remove('hide-overflow');
    }
  }

  clearListeners() {
    if(this._element && Object.keys(this._callback).length > 0) {
      this._element.removeEventListener('click', this._callback.favoritesClick);
      this._element.removeEventListener('click', this._callback.watchlistClick);
      this._element.removeEventListener('click', this._callback.watchedClick);

      document.removeEventListener('keydown', this._onEscKeyDown);
      document.querySelector('.film-details__close-btn')
        .removeEventListener('click', this.removePopUp);

    } else {
      throw Error('Element is not found');
    }
  }

  updateElement(key, updatedFilmData) {
    this._filmData = updatedFilmData;
    const ACTIVE_CLASS = 'film-details__control-button--active';

    if (key === FilmClickIds.WATCH_LIST) {
      this._element.querySelector('.film-details__control-button--watchlist')
        .classList.toggle(ACTIVE_CLASS);
    } else if (key === FilmClickIds.WATCHED) {
      this._element.querySelector('.film-details__control-button--watched')
        .classList.toggle(ACTIVE_CLASS);
    } else if (key === FilmClickIds.FAVORITES) {
      this._element.querySelector('.film-details__control-button--favorite')
        .classList.toggle(ACTIVE_CLASS);
    }
  }
}

