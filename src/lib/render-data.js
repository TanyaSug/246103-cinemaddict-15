import {render} from './render';
import {createSiteMenuTemplate} from '../view/site-menu';
import {createFilmFilterTemplate} from '../view/film-filter';
import {createFilmCardTemplate} from '../view/film-list';
import {createFooterStatsTemplate} from '../view/footer-statistics';
import {createUserStatusTemplate} from '../view/user-status';

export const renderData = (data, siteHeader, siteMainElement, footerStats) => {
  render(siteHeader, createUserStatusTemplate(), 'beforeend');
  render(siteMainElement, createSiteMenuTemplate({}), 'beforeend');
  render(siteMainElement, createFilmFilterTemplate(), 'beforeend');
  render(siteMainElement, createFilmCardTemplate({}), 'beforeend');
  render(footerStats, createFooterStatsTemplate(), 'beforeend');
};
