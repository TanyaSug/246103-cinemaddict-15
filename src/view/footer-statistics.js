import AbstractView from './abstract';

// const FILM_STATS = 1111;
const createFooterStatsTemplate = (filmsCount) => (
  `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>
</footer>`
);

export default class FooterStatistics  extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmsCount);
  }
}
