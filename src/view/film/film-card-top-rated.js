import FilmCardView from './film-card';
import {filmData} from '../../mock/create-1-film';
import AbstractView from '../abstract';

const filmCard = new FilmCardView(filmData);
const createFilmCardTopRated= () => (
  `<section class="films-list films-list--extra">
     <h2 class= "films-list__title">Top rated</h2>
     <div class="films-list__container">
     ${filmCard.getElement()}${filmCard.getElement()}
     </div>
   </section>`
);

export default class FilmCardTopRated extends AbstractView  {
  constructor(filmsData) {
    super();
    this._filmData = filmsData;
  }

  getTemplate() {
    return createFilmCardTopRated(this._filmData);
  }
}
