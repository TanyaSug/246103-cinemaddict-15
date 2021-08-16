import Abstract from '../abstract';

const createPopupCommentsContainerTemplate = () => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
      </section>
    </div>`
);

export default class PopupCommentsContainer extends Abstract{

  getTemplate() {
    return createPopupCommentsContainerTemplate();
  }
}
