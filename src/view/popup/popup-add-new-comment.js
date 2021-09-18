import SmartView from './smart';
import {EMOTIONS} from '../../lib/consts';
import he from 'he';

const emotionsList = EMOTIONS.map((emotion) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
  <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`,
).join('');

const createNewCommentTemplate = ({emotion, text}) => {
  const img = emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">` : '';
  const comment = text || '';
  return (
    `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${img}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(comment)}</textarea>
          </label>

          <div class="film-details__emoji-list">
          ${emotionsList}
  </div>
</div>`
  );
};

export default class PopupNewComment extends SmartView {
  constructor(onCommentAdded) {
    super();
    this._onCommentAdded = onCommentAdded;
    this._emotionIconChangeHandler = this._emotionIconChangeHandler.bind(this);
    this._commentChangeHandler = this._commentChangeHandler.bind(this);
    this._formKeydownHandler = this._formKeydownHandler.bind(this);
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

  _reset() {
    const update = {} ;
    this.updateData(update);
  }

  _formKeydownHandler(evt) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      if ((!this._data.text && this._data.text.length > 0 )|| !this._data.emotion) {
        return;
      }

      const newComment = {
        ...this._data,
      };
      this._onCommentAdded(newComment);
      this._callback.formKeydown(newComment);
      this._reset();
    }
  }

  setCommentChangeHandler() {
    this.getElement().querySelector('textarea')
      .addEventListener('input', this._commentChangeHandler);
  }

  setEmotionChangeHandler() {
    this.getElement().querySelectorAll('input')
      .forEach((element) => {
        element.addEventListener('change', this._emotionIconChangeHandler);
      });
  }

  setFormKeydownHandler() {
    if(!this._callback.formKeydown) {
      this._callback.formKeydown = this._formKeydownHandler;
    }
    document.addEventListener('keydown', this._callback.formKeydown);
  }

  restoreHandlers() {
    this.setEmotionChangeHandler();
    this.setCommentChangeHandler();
    this.setFormKeydownHandler(this._callback.formKeydown);
  }
}
