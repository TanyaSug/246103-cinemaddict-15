import AbstractView from '../abstract';
import {FilterType} from '../../lib/consts';


const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};
const createEmptyFilmsListTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTextType[filterType];
  return (
    `<section class="films-list">
      <h2 class="films-list__title">${noFilmsTextValue}</h2>
    </section>`);
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
