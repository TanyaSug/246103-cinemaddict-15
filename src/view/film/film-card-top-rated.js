import Film1CardView from './film-card';
import {filmData} from '../../mock/create-1-film';
import AbstractView from '../abstract';

const film1Card = new Film1CardView(filmData);
const createFilmCardTopRated= () => (
  `<section class="films-list films-list--extra">
     <h2 class= "films-list__title">Top rated</h2>
     <div class="films-list__container">
     ${film1Card.getElement()}${film1Card.getElement()}
     </div>
   </section>`
);

export default class FilmCardTopRated extends AbstractView  {

  getTemplate() {
    return createFilmCardTopRated();
  }
}
