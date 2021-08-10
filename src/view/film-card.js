import {createElement} from '../lib/render';

export const filmCard = ({
  title, totalRating, releaseDate, runtime, genres, posters, description, commentsCount},
) => (
  `<article class="film-card">
          <h3 class="film-card__title">${title || ''}</h3>
          <p class="film-card__rating">${totalRating || ''}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate || ''}</span>
            <span class="film-card__duration">${runtime || ''}</span>
            <span class="film-card__genre">${genres || ''}</span>
          </p>
          <img src=${posters} alt="" class="film-card__poster">
          <p class="film-card__description">${description || ''}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`
);

export default class Film1Card {
  constructor({
    title, totalRating, releaseDate, runtime, genres, posters, description, commentsCount}) {
    this.data = {
      title, totalRating, releaseDate, runtime, genres, posters, description, commentsCount};
    this._element = null;
    this.handlePosterClick = this.handlePosterClick.bind(this);
  }

  getTemplate() {
    return filmCard(this.data);
  }

  handlePosterClick() {
console.log(this);
  }

  createElement() {
    const result = createElement(this.getTemplate());
    const poster = result.querySelector('.film-card__poster');
    poster.addEventListener('click', this.handlePosterClick);
    return result;
  }

  getElement() {
    if (!this._element) {
      this._element = this.createElement();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
