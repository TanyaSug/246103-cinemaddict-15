import AbstractView from './abstract';
import {computeUserRating} from '../lib/compute-user-rating';

const createUserStatusTemplate = (userRating) => (
  `<header class="header">
    <h1 class="header__logo logo">Cinemaddict</h1>

    <section class="header__profile profile">
    <p class="profile__rating">${userRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  </header>`
);

export default class UserStatus extends AbstractView {
  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  getTemplate() {
    return createUserStatusTemplate(computeUserRating(this._userRating));
  }
}
