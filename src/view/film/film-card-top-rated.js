import Film1CardView from './film-card';
import {filmData} from '../../mock/create-1-film';
import AbstractView from '../abstract';

const film1Card = new Film1CardView(filmData);
const createFilmCardTopRatedAndCommented = () => (
  `<section class="films">
    <section class="films-list films-list--extra">
     <h2 class= "films-list__title">Top rated</h2>
     <div class="films-list__container">
   ${film1Card.getElement()}${film1Card.getElement()}
     </div>
    </section>
     <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
    ${[...Array(2).fill(null)].map(() => film1Card.getElement()).join('')}
      </div>
     </section>
  </section>`
);

export default class FilmCardTopRatedAndCommented extends AbstractView  {

  getTemplate() {
    return createFilmCardTopRatedAndCommented();
  }
}
