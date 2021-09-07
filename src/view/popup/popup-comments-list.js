import AbstractView from '../abstract';


const createPopupCommentsListTemplate = () => (
  '<ul class="film-details__comments-list"></ul>'
);

export default class PopupCommentsList extends AbstractView {

  getTemplate() {
    return createPopupCommentsListTemplate();
  }
}
