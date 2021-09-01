import PopupContainerView from '../view/popup/popup-container';
import FilmPopupView from '../view/popup/film-popup';
import PopupCommentsContainerView from '../view/popup/comm-container';
import PopupCommentsListview from '../view/popup/popup-comments-list';
import PopupNewCommentView from '../view/popup/popup-add-new-comment';
import PopupCommentDetailsView from '../view/popup/popup-comment-details';
import {renderElement} from '../lib/render';
import {RenderPosition} from '../lib/consts';

export default class PopupPresenter {
  constructor(filmsData) {
    this._container = new PopupContainerView();
    this._filmsData = filmsData;
    this._popupContainer = null;
    this._filmPopupInfoComponent = null;
    this._commentsContainer = null;
    this._popupCommentsListComponent = null;
    this._popupCommentDetailsComponent = null;
    this._popupNewCommentComponent = null;
  }

  _renderPopupContainer() {
    // this._popupContainer = new PopupContainerView();
    renderElement(this._container, this._popupContainer, RenderPosition.BEFOREEND);
  }

  _renderFilmPopupInfo() {
    this._filmPopupInfoComponent = new FilmPopupView(this._filmsData);
    renderElement(this._popupContainer, this._filmPopupInfoComponent, RenderPosition.BEFOREEND);
  }

  _renderCommentsContainer() {
    this._commentsContainer = new PopupCommentsContainerView();
    renderElement(this._popupContainer, this._commentsContainer, RenderPosition.BEFOREEND);
  }

  _renderCommentsList() {
    this._popupCommentsListComponent = new PopupCommentsListview();
    renderElement(this._commentsContainer, this._popupCommentsListComponent, RenderPosition.BEFOREEND);
  }

  _renderCommentDetails() {
    this._popupCommentDetailsComponent = new PopupCommentDetailsView();
    renderElement(this._popupCommentsListComponent, this._popupCommentDetailsComponent, RenderPosition.BEFOREEND);
  }

  _renderNewComment() {
    this._popupNewCommentComponent = new PopupNewCommentView();
    renderElement(this._commentsContainer, this._popupNewCommentComponent, RenderPosition.BEFOREEND);
  }

  _render() {
    this._renderPopupContainer();
    this._renderFilmPopupInfo();
    this._renderCommentsContainer();
    this._renderCommentsList();
    this._renderCommentDetails();
    this._renderNewComment();
  }

  execute() {
    this._render();
  }
}
