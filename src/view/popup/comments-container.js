import AbstractView from '../abstract';

const createPopupCommentsContainerTemplate = () => (
  `<div class="film-details__bottom-container">
    </div>`
);

export default class PopupCommentsContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createPopupCommentsContainerTemplate();
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('.film-details__comments-wrap');
  }
}
