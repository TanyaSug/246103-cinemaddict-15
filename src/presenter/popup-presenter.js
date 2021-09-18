import PopupContainerView from '../view/popup/popup-container';
import PopupFilmInfoView from '../view/popup/popup-film-info';
import PopupCommentsContainerView from '../view/popup/comments-container';
import PopupCommentsListView from '../view/popup/popup-comments-list';
import PopupNewCommentView from '../view/popup/popup-add-new-comment';
import PopupCommentDetailsView from '../view/popup/comments-list-details';
import {remove, renderElement} from '../lib/render';
import {RenderPosition, UpdateType, UserAction} from '../lib/consts';

export default class PopupPresenter {
  constructor(onToggleUserControls, handlePopupAction) {
    this._popupContainer = null;
    this._filmData = null;
    this._comments = [];
    this._filmPopupInfoComponent = null;
    this._commentsContainer = null;
    this._popupCommentsListComponent = null;
    this._popupCommentDetailsComponents = new Map();
    this._popupNewCommentComponent = null;

    this._onToggleUserControls = onToggleUserControls;
    this._handlePopupAction = handlePopupAction;

    this._handleDeleteButton = this._handleDeleteButton.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  get filmPopupInfoComponent() {
    return this._filmPopupInfoComponent;
  }

  _renderPopupContainer() {
    this._popupContainer = new PopupContainerView(this._filmData);
    // const popupContainerInnerPoint = this._popupContainer.getInnerPoint();
  }

  _renderFilmPopupInfo() {
    const filmPopupInfoComponent = new PopupFilmInfoView(this._filmData);

    filmPopupInfoComponent.setFavoritesClickHandler(this._onToggleUserControls);
    filmPopupInfoComponent.setWatchlistClickHandler(this._onToggleUserControls);
    filmPopupInfoComponent.setWatchedClickHandler(this._onToggleUserControls);

    renderElement(this._popupContainer, filmPopupInfoComponent, RenderPosition.BEFOREEND);
    this._filmPopupInfoComponent = filmPopupInfoComponent;
  }

  _renderCommentsContainer() {
    this._commentsContainer = new PopupCommentsContainerView(this._comments.length);
    // const commentsContainerInnerPoint = this._commentsContainer.getInnerPoint();
    renderElement(this._popupContainer, this._commentsContainer, RenderPosition.BEFOREEND);
  }

  _renderCommentsList() {
    this._popupCommentsListComponent = new PopupCommentsListView();
    renderElement(this._commentsContainer, this._popupCommentsListComponent, RenderPosition.BEFOREEND);
  }

  _handleDeleteButton(commentId) {
    remove(this._popupCommentDetailsComponents.get(commentId));
    this._filmData.comments = this._filmData.comments.filter((comId) => comId !== commentId);

    this._handlePopupAction(UserAction.DELETE_COMMENT, UpdateType.COMMENT, commentId);
    this._handlePopupAction(UserAction.UPDATE_FILM, UpdateType.PATCH, this._filmData);
  }

  // renderElement(this._popupCommentsListComponent, this._popupCommentDetailsComponent, RenderPosition.BEFOREEND);
  // this._popupCommentDetailsComponent.setDeleteButtonHandler(this._handleDeleteButton);
  _renderCommentDetails() {
    this._comments.forEach(this._addComment);
  }

  _addComment(comment) {
    const popupComment = new PopupCommentDetailsView(comment);
    popupComment.setDeleteButtonHandler(this._handleDeleteButton);
    renderElement(this._popupCommentsListComponent, popupComment, RenderPosition.BEFOREEND);
    this._popupCommentDetailsComponents.set(comment.id, popupComment);
  }

  _renderNewComment() {
    this._popupNewCommentComponent = new PopupNewCommentView((
      (newComment) =>{
        // mock server comment respond
        const newCommentFromServer = {...newComment, date: new Date(), author: 'Tany', id: Math.random()};
        this._comments.push(newCommentFromServer);
        this._filmData.comments.push(newCommentFromServer.id);
        this._addComment(newCommentFromServer);

        this._handlePopupAction(UserAction.ADD_COMMENT, UpdateType.COMMENT, newCommentFromServer);
        this._handlePopupAction(UserAction.UPDATE_FILM, UpdateType.PATCH, this._filmData);
      }),
    );
    this._popupNewCommentComponent.setEmotionChangeHandler();
    this._popupNewCommentComponent.setCommentChangeHandler();
    this._popupNewCommentComponent.setFormKeydownHandler();
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

  appendPopUp() {
    const popup = document.querySelector('.film-details');
    if (popup && this._popupContainer) {
      this._popupContainer.removePopUp();
    }

    this._render();
    this._popupContainer.appendPopUp();
  }

  updateElement(updatedFilmData) {
    this._filmData = updatedFilmData;
    if(this._filmPopupInfoComponent) {
      this._filmPopupInfoComponent.updateElement(updatedFilmData);
    }
  }

  destroy() {
    remove(this._popupContainer);
  }

  execute(filmData, comments) {
    this._comments = comments;
    this._filmData = filmData;
    this.appendPopUp();
  }
}
