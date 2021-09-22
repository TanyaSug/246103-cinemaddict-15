import AbstractView from '../abstract';
import {NoFilmsTextType} from '../../lib/no-films-text-type';


const createEmptyFilmsListTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTextType[filterType];
  return (
    `<h2 class="films-list__title">${noFilmsTextValue}</h2>`);
};

export default class FilmsListEmpty extends AbstractView {
  constructor(films) {
    super();
    this._filmsData = films;
  }

  getTemplate() {
    return createEmptyFilmsListTemplate(this._filmsData);
  }
}
