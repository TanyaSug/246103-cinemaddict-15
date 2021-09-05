// import Abstract from '../abstract';
// import NewCommentView from './new-comment';
// import PopupCommentDetailsView from './popup-comment-details';
import Smart from './smart';
import {filmData} from '../../mock/create-1-film';
import dayjs from 'dayjs';
import {EMOTIONS} from '../../lib/consts';

const emotionsList = EMOTIONS.map((emotion) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
  <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`,
).join('');

const createNewCommentTemplate = (commentText) => (
  `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
          </label>

          <div class="film-details__emoji-list">
          ${emotionsList}
  </div>
</div>`
);

const BUTTON_NAME = 'Delete';
const createCommentDetailsTemplate = (film) => (
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${film.comments.emotion}.png" width="55" height="55" alt="emoji-${film.comments.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${film.comments.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${film.comments.author}</span>
                <span class="film-details__comment-day">${dayjs(film.comments.date).format('YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete">${BUTTON_NAME}</button>
              </p>
            </div>
          </li>`
);

const commentDetails = createCommentDetailsTemplate(filmData);
const newComment = createNewCommentTemplate();

const createPopupCommentsContainerTemplate = () => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">0</span></h3>

        <ul class="film-details__comments-list">${commentDetails}</ul>

        ${newComment}`
);

export default class PopupComments extends Smart{
  constructor(film) {
    super();
    this._filmData = PopupComments.parseStateToData(film);

    this._emotionsIconClickHandler = this._emotionsIconClickHandler.bind(this);
    this._textareaInputHandler = this._textareaInputHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupCommentsContainerTemplate();
  }

  _emotionsIconClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value,
    });

  }

  _textareaInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  _deleteButtonClickHandler() {}

  static parseStateToData(film) {
    return Object.assign(
      {},
      film,
    );
  }


  static parseDataToState(data) {
    data = Object.assign({}, data);
  }

  reset(film) {
    this.updateData(
      PopupComments.parseStateToData(film),
    );
  }
}
