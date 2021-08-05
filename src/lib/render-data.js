import {render} from './render';
import {createSiteMenuTemplate} from '../view/site-menu';
import {createFilmFilterTemplate} from '../view/film-filter';
import {createFilmCardTemplate} from '../view/film-list';
import {createFooterStatsTemplate} from '../view/footer-statistics';
import {createUserStatusTemplate} from '../view/user-status';
// import {create1Film} from '../mock/create-1-film';

// const FILM_COUNT = 5;
// const filmCards = new Array(FILM_COUNT).fill().map(create1Film);
export const renderData = (data, siteHeader, siteMainElement, footerStats) => {
  render(siteHeader, createUserStatusTemplate(), 'beforeend');
  render(siteMainElement, createSiteMenuTemplate({}), 'beforeend');
  render(siteMainElement, createFilmFilterTemplate(), 'beforeend');
  render(siteMainElement, createFilmCardTemplate({}), 'beforeend');
  render(footerStats, createFooterStatsTemplate(), 'beforeend');
};
