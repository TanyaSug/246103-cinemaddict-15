import Film1CardView from './film-card';
import AbstractView from '../abstract';
import {filmData} from '../../mock/create-1-film';

const film1Card = new Film1CardView(filmData);
export const createFilmCardMostCommented = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      ${film1Card.getElement()}${film1Card.getElement()}
      </div>
   </section>`
);

export default class FilmCardMostCommented extends AbstractView  {

  getTemplate() {
    return createFilmCardMostCommented();
  }
}
