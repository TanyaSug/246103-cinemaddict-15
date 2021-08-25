// import {renderData} from './lib/render-data';
// import {loadData} from './api/load-data';
import FilmPopup from './view/popup/film-popup';
import FilmsListPresenter from './presenter/films-presenter';
// import {loadData} from './api/load-data';


const siteContainer = document.querySelector('body');
export const filmsMainContainer = siteContainer.querySelector('main');
export const filmsListContainer = filmsMainContainer.querySelector('.films');

// const footerContainer = document.querySelector('.footer');
// const footerStats = footerContainer.querySelector('.footer__statistics');
// const showPopup = (film) => new FilmPopup(film).appendPopUp();
const closePopup = (film) => new FilmPopup(film).removePopUp();

export const onEscKeyDown = (evt) => {
  if ( evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};
document.addEventListener('keydown', onEscKeyDown);

// loadData()
//   .then((data) => {
const presenter = new FilmsListPresenter(siteContainer, undefined);
presenter.execute();
// });

