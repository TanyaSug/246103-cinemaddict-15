import AbstractView from '../abstract';


const createPopupCommentsListTemplate = (commentsCount) => (
  `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span
      class="film-details__comments-count">${commentsCount}</span></h3>
        <ul class="film-details__comments-list"></ul>
  </section>`
);

export default class PopupCommentsList extends AbstractView {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createPopupCommentsListTemplate(this._commentsCount);
  }

  getInnerPoint() {
    const element = this.getElement();
    return element.querySelector('.film-details__comments-list');
  }

  updateElement(commentsCount) {
    this._commentsCount = commentsCount;
    super.updateElement();
  }

  restoreHandlers() {}
}
