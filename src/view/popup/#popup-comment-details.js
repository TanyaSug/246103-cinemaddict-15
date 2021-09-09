// import Smart from './smart';
// import dayjs from 'dayjs';
//
//
// const BUTTON_NAME = 'Delete';
// const BUTTON_NAME_DELETING = 'Deleting';
//
// const createCommentDetailsTemplate = (comments) => {
//   const commentsList = comments.map((comment) => (
//     `<li class="film-details__comment">
//             <span class="film-details__comment-emoji">
//               <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
//             </span>
//             <div>
//               <p class="film-details__comment-text">${comment.text}</p>
//               <p class="film-details__comment-info">
//                 <span class="film-details__comment-author">${comment.author}</span>
//                 <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
//                 <button class="film-details__comment-delete" ${comment.isDeleting ? 'disabled' : ''}>${comment.isDeleting ? BUTTON_NAME_DELETING : BUTTON_NAME}</button>
//               </p>
//             </div>
//           </li>`
//   )).join('');
//
//   return(
//     `<ul class="film-details__comments-list">${commentsList}</ul>`
//   );
// };
//
// export default class PopupCommentDetails extends Smart{
//   constructor(comments) {
//     super();
//
//     this._data = PopupCommentDetails.parseDataToState(comments);
//     this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
//
//   }
//
//   getTemplate() {
//     return createCommentDetailsTemplate(this._data);
//   }
//
//   _deleteButtonHandler(evt) {
//     evt.preventDefault();
//     this._callback.deleteButton(PopupCommentDetails.parseStateToData(this._data));
//   }
//
//   setDeleteButtonHandler(callback) {
//     this._callback.deleteButton = callback;
//     this.getElement().querySelector('.film-details__comment-delete')
//       .addEventListener('click', this._deleteButtonHandler);
//
//   }
//
//   static parseDataToState(comments) {
//     return comments.map((comment) =>
//       Object.assign({}, comment, { isDeleting: false }));
//   }
//
//   static parseStateToData(film) {
//     film = Object.assign({}, film);
//   }
// }