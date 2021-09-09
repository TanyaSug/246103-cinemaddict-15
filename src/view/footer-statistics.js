import AbstractView from './abstract';

const FILM_STATS = 1111;
const createFooterStatsTemplate = () => (
  `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    <p>${FILM_STATS} movies inside</p>
  </section>
</footer>`
);

export default class FooterStatistics  extends AbstractView {

  getTemplate() {
    return createFooterStatsTemplate();
  }
}
