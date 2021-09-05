// import {renderData} from './lib/render-data';
// import {loadData} from './api/load-data';
// import PopupFilmInfo from './view/popup/film-popup';
import MainPresenter from './presenter/main-presenter';
// import {loadData} from './api/load-data';


const bodyContainer = document.querySelector('body');
// export const filmsMainContainer = siteContainer.querySelector('main');
// export const filmsListContainer = filmsMainContainer.querySelector('.films');

// const footerContainer = document.querySelector('.footer');
// const footerStats = footerContainer.querySelector('.footer__statistics');
// const showPopup = (film) => new PopupFilmInfo(film).appendPopUp();
// const closePopup = (film) => new PopupFilmInfo(film).removePopUp();

// document.addEventListener('keydown', onEscKeyDown);

// loadData()
//   .then((data) => {
const presenter = new MainPresenter(bodyContainer, undefined);
presenter.execute();
// });

