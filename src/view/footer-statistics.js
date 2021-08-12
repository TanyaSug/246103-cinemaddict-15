import {createElement} from '../lib/render';

const FILM_STATS = 1111;
const createFooterStatsTemplate = () => `<p>${FILM_STATS} movies inside</p>`;

export default class FooterStatistics {
  constructor(filmStats) {
    this._element = null;
    this._filmStats = filmStats;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmStats);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
