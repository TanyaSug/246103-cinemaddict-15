import {renderData} from './lib/render-data';
import {loadData} from './api/load-data';

// import {showMoreButtonHandler} from './view/film-list-container';

const siteHeader = document.querySelector('.header');
export const siteMainElement = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');

loadData()
  .then((data) => renderData(data, siteHeader, siteMainElement, footerStats));
  // .then(showMoreButtonHandler);


