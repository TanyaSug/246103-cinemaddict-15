import {renderData} from './lib/render-data';
import {loadData} from './api/load-data';
// import {create1} from './mock/create-film-info';
import {create1Film} from './mock/create-1-film';


const siteHeader = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');
loadData().then((data) => renderData(data,siteHeader, siteMainElement, footerStats));

console.log(create1Film());
