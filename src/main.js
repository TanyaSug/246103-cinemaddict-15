import {renderData} from './lib/render-data';
import {loadData} from './api/load-data';
import FilmPopup from './view/popup/film-popup';
import FilmsListPresenter from './presenter/films-presenter';


const container = document.querySelector('body');
export const siteMainElement = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');
const showPopup = (film) => new FilmPopup(film).appendPopUp();
// const closePopup = (film) => new FilmPopup(film).removePopUp();

// const escapePressedHandler = (evt) => {
//   if ( evt.key === 'Escape' || evt.key === 'Esc') {
//     evt.preventDefault();
//     closePopup();
//     document.removeEventListener('keydown', escapePressedHandler);
//   }
// };

const presenter = new FilmsListPresenter(container, undefined);
presenter.execute();
// loadData()
//   .then((data) => renderData(
//     {
//       data,
//       container,
//       // onFilmSelect: showPopup,
//     }
//     ));


