import AbstractView from '../abstract';


const createFilmsListContainerTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
  </section>`
);

export default class FilmsListContainer extends AbstractView {

  getTemplate() {
    return createFilmsListContainerTemplate();
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('.films-list__container');
  }
}
