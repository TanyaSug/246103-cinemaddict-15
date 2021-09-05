// import FilmCardView from './film-card';
// import {filmData} from '../../mock/create-1-film';
import AbstractView from '../abstract';

// const filmCard = new FilmCardView(filmData);
const createFilmCardTopRated= () => (
  `<section class="films-list films-list--extra">
     <h2 class= "films-list__title">Top rated</h2>
     <div class="films-list__container">

     </div>
   </section>`
);

export default class ExtraFilms extends AbstractView  {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmCardTopRated();
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('.films-list__container');
  }
}
