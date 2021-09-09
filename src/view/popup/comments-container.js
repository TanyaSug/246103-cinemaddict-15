import AbstractView from '../abstract';

const createPopupCommentsContainerTemplate = (commentsCount) => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
      </section>
    </div>`
);


export default class PopupCommentsContainer extends AbstractView {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createPopupCommentsContainerTemplate(this._commentsCount);
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('.film-details__comments-wrap');
  }
}
