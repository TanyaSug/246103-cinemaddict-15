import AbstractView from '../abstract';

const createPopupContainerTemplate = () => (
  `<section class="film-details">
     <form class="film-details__inner" action="" method="get">
     </form>
   </section>`
);


export default class PopupContainer extends AbstractView {

  getTemplate() {
    return createPopupContainerTemplate();
  }
}