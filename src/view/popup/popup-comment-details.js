import Smart from './smart';
import dayjs from 'dayjs';


const BUTTON_NAME = 'Delete';
const BUTTON_NAME_DELETING = 'Deleting';

const createCommentDetailsTemplate = (comment) => (
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete" ${comment.isDeleting ? 'disabled' : ''}>${comment.isDeleting ? BUTTON_NAME_DELETING : BUTTON_NAME}</button>
              </p>
            </div>
          </li>`
);

export default class PopupCommentDetails extends Smart{
  constructor(comment) {
    super();
    this._data = PopupCommentDetails.parseDataToState(comment);

  }

  getTemplate() {
    return createCommentDetailsTemplate(this._data);
  }

  static parseDataToState(data) {
    return Object.assign({}, data, {isDeleting: false});
  }
}
