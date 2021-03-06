import PopupContainerView from '../view/popup/popup-container';
import PopupFilmInfoView from '../view/popup/popup-film-info';
import PopupCommentsContainerView from '../view/popup/comments-container';
import PopupCommentsListView from '../view/popup/popup-comments-list';
import PopupNewCommentView from '../view/popup/popup-add-new-comment';
import PopupCommentDetailsView from '../view/popup/comments-list-details';
import {remove, renderElement} from '../lib/render';
import {RenderPosition, UpdateType, UserAction} from '../lib/consts';


export default class PopupPresenter {
  constructor(onToggleUserControls, handlePopupAction, api) {
    this._popupContainer = null;
    this._filmData = null;
    this._comments = [];
    this._api = api;
    this._filmPopupInfoComponent = null;
    this._commentsContainer = null;
    this._popupCommentsListComponent = null;
    this._popupCommentDetailsComponents = new Map();
    this._popupNewCommentComponent = null;

    this.setAborting = this.setAborting.bind(this);
    this.setSavingComment = this.setSavingComment.bind(this);
    this._handleDeleteCommentButton = this._handleDeleteCommentButton.bind(this);
    this._addComment = this._addComment.bind(this);
    this._onToggleUserControls = onToggleUserControls;
    this._handlePopupAction = handlePopupAction;
  }

  get filmPopupInfoComponent() {
    return this._filmPopupInfoComponent;
  }

  open() {
    this._render();
    this._popupContainer.append();
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
    this.open();
  }

  setSavingComment(isSaving) {
    this._popupNewCommentComponent.updateData({isSaving});
  }

  setAborting() {
    const resetFormState = () => {
      this._popupNewCommentComponent.updateData({
        isSaving: false,
      });
    };
    this._popupContainer.shake(resetFormState);
  }

  _renderPopupContainer() {
    this._popupContainer = new PopupContainerView(this._filmData, () => {
      this._popupNewCommentComponent && this._popupNewCommentComponent.clearListeners();
    });
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
    renderElement(this._popupContainer, this._commentsContainer, RenderPosition.BEFOREEND);
  }

  _renderCommentsList() {
    this._popupCommentsListComponent = new PopupCommentsListView(this._comments.length);
    renderElement(this._commentsContainer, this._popupCommentsListComponent, RenderPosition.BEFOREEND);
  }

  _handleDeleteCommentButton(commentId) {
    const comment = this._comments.find((comm) => comm.id === commentId);
    const currentComment = this._popupCommentDetailsComponents.get(commentId);
    currentComment.updateElement({...comment, isDeleting: true});
    this._api.deleteComment(commentId).then(() => {
      this._filmData.comments = this._filmData.comments.filter((commId) => commId !== commentId);
      this._comments = this._comments.filter((comm) => comm.id !== commentId);
      this._popupCommentsListComponent.updateElement(this._comments.length);
      this._comments.forEach((comm) => {
        this._addComment(comm);
      });
      this._handlePopupAction(UserAction.UPDATE_FILM, UpdateType.PATCH, this._filmData);
    }).catch(() => {
      currentComment.updateElement({...comment, isDeleting: false});
    });
  }

  _renderCommentDetails() {
    this._comments.forEach(this._addComment);
  }

  _addComment(comment) {
    const popupComment = new PopupCommentDetailsView(comment);
    popupComment.setDeleteButtonHandler(this._handleDeleteCommentButton);
    const innerPoint = this._popupCommentsListComponent.getInnerPoint();
    renderElement(innerPoint, popupComment, RenderPosition.BEFOREEND);
    this._popupCommentDetailsComponents.set(comment.id, popupComment);
  }

  _renderNewComment() {
    this._popupNewCommentComponent = new PopupNewCommentView((
      (newComment) =>{
        this.setSavingComment(true);
        this._api.addComment(this._filmData.id, newComment).then(({film, comments}) => {
          this._comments = comments;
          this._filmData = film;
          this._popupCommentsListComponent.updateElement(comments.length);
          comments.forEach((comment) => {
            this._addComment(comment);
          });
          this.setSavingComment(false);
          this._popupNewCommentComponent.reset();
          this._handlePopupAction(UserAction.UPDATE_FILM, UpdateType.PATCH, film);
        }).catch(() => {
          this.setAborting();
        });
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
}
