import {filmCard} from './film-card';
import {filmData} from '../mock/create-1-film';
import {createElement} from '../lib/render';

const createFilmCardTopRatedAndCommented = () => (
  `<section class="films">
    <section class="films-list films-list--extra">
     <h2 class= "films-list__title">Top rated</h2>
     <div class="films-list__container">
   ${[...Array(2).fill(null)].map(() => filmCard(filmData)).join('')}
     </div>
    </section>
     <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
    ${[...Array(2).fill(null)].map(() => filmCard(filmData)).join('')}
      </div>
     </section>
  </section>`
);

export default class FilmCardTopRatedAndCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTopRatedAndCommented();
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
