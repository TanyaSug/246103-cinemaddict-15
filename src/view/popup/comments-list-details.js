import Smart from './smart';
import dayjs from 'dayjs';
import {BUTTON_NAME, BUTTON_NAME_DELETING} from '../../lib/consts';


const createCommentDetailsTemplate = (comment) => (
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete" ${comment.isDeleting ? 'disabled' : ''}>${comment.isDeleting ? BUTTON_NAME_DELETING : BUTTON_NAME}</button>
              </p>
            </div>
          </li>`
);

export default class PopupCommentDetails extends Smart {
  constructor(comment) {
    super();
    this._comment = comment;
    this._deleteButtonHandler = this._deleteButtonHandler.bind(this);

  }

  getTemplate() {
    return createCommentDetailsTemplate(this._comment);
  }

  _deleteButtonHandler(evt) {
    evt.preventDefault();
    this._callback.deleteButton(this._comment.id);
  }

  setDeleteButtonHandler(callback) {
    this._callback.deleteButton = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete')
      .forEach((comment) => comment
        .addEventListener('click', this._deleteButtonHandler));
  }


  restoreHandlers() {
    this.setDeleteButtonHandler(this._callback.deleteButton);
  }

  updateElement(comment) {
    this._comment = comment;
    super.updateElement();
  }
}
