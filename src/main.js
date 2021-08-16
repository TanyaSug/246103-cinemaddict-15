import {renderData} from './lib/render-data';
import {loadData} from './api/load-data';
import FilmPopup from './view/popup/film-popup';


const siteHeader = document.querySelector('.header');
export const siteMainElement = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');
const showPopup = (film) => new FilmPopup(film).appendPopUp();

loadData()
  .then((data) => renderData(
    {
      data,
      siteHeader,
      siteMainElement,
      footerStats,
      onFilmSelect: showPopup,
    }));


