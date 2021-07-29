import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserStatusTemplate} from './view/user-status.js';
import {createFilmFilterTemplate} from './view/film-filter.js';
import {createFilmCardTemplate} from './view/film-card.js';
// import {createFilmStatsTemplate} from './view/film-stats.js';
import {createFooterStatsTemplate} from './view/footer-statistics.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('.header');
render(siteHeader, createUserStatusTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmFilterTemplate(), 'beforeend');
render(siteMainElement, createFilmCardTemplate(), 'beforeend');
// render(siteMainElement, createFilmStatsTemplate(), 'beforeend');

const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');
render(footerStats, createFooterStatsTemplate(), 'beforeend');
