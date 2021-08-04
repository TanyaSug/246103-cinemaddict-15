import {renderData} from './lib/render-data';
import {loadData} from './api/load-data';

const siteHeader = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');
loadData().then((data) => renderData(data,siteHeader, siteMainElement, footerStats));



