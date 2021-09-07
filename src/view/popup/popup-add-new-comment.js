import SmartView from './smart';
import {EMOTIONS} from '../../lib/consts';

const emotionsList = EMOTIONS.map((emotion) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
  <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`,
).join('');

const createNewCommentTemplate = ({emotion, text}) => {
  const img = emotion ? `<img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">` : '';
  const comment = text || '';
  return (
    `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${img}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
          </label>

          <div class="film-details__emoji-list">
          ${emotionsList}
  </div>
</div>`
  );
};

export default class PopupNewComment extends SmartView {
  constructor() {
    super();
    // this._data = {};
    // this._data = PopupNewComment.parseDataToState();
    this._emotionIconChangeHandler = this._emotionIconChangeHandler.bind(this);
    this._commentChangeHandler = this._commentChangeHandler.bind(this);
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  _emotionIconChangeHandler(evt) {
    evt.preventDefault();
    const update = {
      emotion: evt.target.value,
    };

    this.updateData(update);
  }

  _commentChangeHandler(evt) {
    evt.preventDefault();
    const update = {
      text: evt.target.value,
    };

    this.updateData(update, true);
  }

  setCommentChangeHandler() {
    this.getElement().querySelector('textarea')
      .addEventListener('input', this._commentChangeHandler);
  }

  setEmotionChangeHandler() {
    this.getElement().querySelectorAll('input').forEach((element) => {
      element.addEventListener('change', this._emotionIconChangeHandler);
    });
  }

  restoreHandlers() {
    this.setEmotionChangeHandler();
    this.setCommentChangeHandler();
  }

  // static parseDataToState(update) {
  //   return Object.assign({},this._data, update);
  // }
  //
  // static parseStateToData(film) {
  //   film = Object.assign({}, film);
  // }
}
