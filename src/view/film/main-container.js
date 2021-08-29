import AbstractView from '../abstract';

const createFilmsContainerTemplate = () => '<main class="main"></main>';

export default class MainContainer extends AbstractView {

  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
