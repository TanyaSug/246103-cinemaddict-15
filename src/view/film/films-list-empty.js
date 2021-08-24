import AbstractView from '../abstract';

const createEmptyFilmsListTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
);

export default class FilmsListEmpty extends AbstractView {
  getTemplate() {
    return createEmptyFilmsListTemplate();
  }
}
