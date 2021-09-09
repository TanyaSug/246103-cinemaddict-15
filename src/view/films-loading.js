import AbstractView from './abstract';

const createFilmsLoadingTemplate = () => (
  ` <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
);

export default class FilmsLoading extends AbstractView {
  getTemplate() {
    return createFilmsLoadingTemplate();
  }
}
