import FilmCardView from './film-card';
import AbstractView from '../abstract';
import {filmData} from '../../mock/create-1-film';

const filmCard = new FilmCardView(filmData);
export const createFilmCardMostCommented = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      ${filmCard.getElement()}${filmCard.getElement()}
      </div>
   </section>`
);

export default class FilmCardMostCommented extends AbstractView  {
  constructor(filmsData) {
    super();
    this._filmData = filmsData;
  }

  getTemplate() {
    return createFilmCardMostCommented(this._filmData);
  }
}
