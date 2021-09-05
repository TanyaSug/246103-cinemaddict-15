import PopupContainerView from '../view/popup/popup-container';
import PopupFilmInfoView from '../view/popup/popup-film-info';
import PopupCommentsContainerView from '../view/popup/comments-container';
// import PopupCommentsListview from '../view/popup/popup-comments-list';
import PopupNewCommentView from '../view/popup/popup-add-new-comment';
import PopupCommentDetailsView from '../view/popup/popup-comment-details';
import {remove, renderElement} from '../lib/render';
import {RenderPosition} from '../lib/consts';

export default class PopupPresenter {
  constructor(onToggleUserControls) {
    this._popupContainer = null;
    this._filmData = null;
    this._filmPopupInfoComponent = null;
    this._commentsContainer = null;
    this._popupCommentsListComponent = null;
    this._popupCommentDetailsComponent = null;
    this._popupNewCommentComponent = null;

    this._onToggleUserControls = onToggleUserControls;
    this._handleDeleteButton = this._handleDeleteButton.bind(this);
  }

  _renderPopupContainer() {
    this._popupContainer = new PopupContainerView();
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
    this._commentsContainer = new PopupCommentsContainerView();
    // const commentsContainerInnerPoint = this._commentsContainer.getInnerPoint();
    renderElement(this._popupContainer, this._commentsContainer, RenderPosition.BEFOREEND);
  }

  // _renderCommentsList() {
  //   this._popupCommentsListComponent = new PopupCommentsListview();
  //   renderElement(this._commentsContainer, this._popupCommentsListComponent, RenderPosition.BEFOREEND);
  // }

  _handleDeleteButton() {
    remove(this._popupCommentDetailsComponent);
  }

  _renderCommentDetails() {
    this._popupCommentDetailsComponent = new PopupCommentDetailsView(this._filmData.comments);
    renderElement(this._commentsContainer, this._popupCommentDetailsComponent, RenderPosition.BEFOREEND);
    this._popupCommentDetailsComponent.setDeleteButtonHandler(this._handleDeleteButton);
  }

  _renderNewComment() {
    this._popupNewCommentComponent = new PopupNewCommentView();
    renderElement(this._commentsContainer, this._popupNewCommentComponent, RenderPosition.BEFOREEND);
  }

  _render() {
    this._renderPopupContainer();
    this._renderFilmPopupInfo();
    this._renderCommentsContainer();
    // this._renderCommentsList();
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

  toggleUserControls(key, filmData) {
    this._filmData = filmData;

    if(this._filmPopupInfoComponent) {
      this._filmPopupInfoComponent.toggleUserControls(key, filmData);
    }
  }

  destroy() {
    remove(this._popupContainer);
  }

  execute(filmData) {
    this._filmData = filmData;
    this.appendPopUp();
  }
}
