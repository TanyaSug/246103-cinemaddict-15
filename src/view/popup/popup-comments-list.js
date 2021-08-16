import AbstractView from '../abstract';


const createPopupCommentsListTemplate = () => (
  '   <ul class="film-details__comments-list"></ul>'
);

export default class PopupCommentsList extends AbstractView{

  getTemplate() {
    return createPopupCommentsListTemplate();
  }
  //
  // getElement() {
  //   if (!this._element) {
  //     this._element = createElement(this.getTemplate());
  //   }
  //
  //   return this._element;
  // }
  //
  // _createElement () {
  //   const result = createElement(this.getTemplate());
  //   const container = result.querySelector('.film-details__comments-list');
  //   this._element.appendChild();
  //   return container;
  // }
  //
  // removeElement() {
  //   this._element = null;
  // }
}
