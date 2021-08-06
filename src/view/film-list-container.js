import {filmCard} from './film-card';
import {filmData} from '../mock/create-1-film';

export const createFilmCardTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
   ${[...Array(5).fill(null)].map(() => filmCard(filmData)).join('')};
      </div>
    </section>
</section>`
);
