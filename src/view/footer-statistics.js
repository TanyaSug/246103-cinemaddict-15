import AbstractView from './abstract';
import {computeTotalFilms} from '../utils';

const createFooterStatsTemplate = (filmsCount) => (
  `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>
</footer>`
);

export default class FooterStatistics  extends AbstractView {
  constructor(films) {
    super();
    this._films= films;
  }

  getTemplate() {
    return createFooterStatsTemplate(computeTotalFilms(this._films));
  }
}
