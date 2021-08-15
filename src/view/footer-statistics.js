import AbstractView from './abstract';

const FILM_STATS = 1111;
const createFooterStatsTemplate = () => `<p>${FILM_STATS} movies inside</p>`;

export default class FooterStatistics  extends AbstractView {

  getTemplate() {
    return createFooterStatsTemplate();
  }
}
