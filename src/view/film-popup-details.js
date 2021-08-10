import {createElement} from '../lib/render';

const createFilmPopupDetails = ({
  ageRating, title, alternativeTitle, posters, totalRating, director, writers, actors, releaseDate, runtime, releaseCountry, genres, description},
) => (
  `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${posters} alt="">

          <p class="film-details__age">${ageRating || ''}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title || ''}</h3>
              <p class="film-details__title-original">${alternativeTitle || ''}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating || ''}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director || ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers || ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors || ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate || ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime || ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry || ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genres || ''}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description || ''}
          </p>
        </div>
      </div>`
);

export default class FilmPopup {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupDetails(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

