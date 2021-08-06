import {render} from './render';
import {createSiteMenuTemplate} from '../view/site-menu';
import {createFilmFilterTemplate} from '../view/film-filter';
import {createFilmCardTemplate} from '../view/film-list-container';
import {createFooterStatsTemplate} from '../view/footer-statistics';
import {createUserStatusTemplate} from '../view/user-status';
import {createFilmCardTopRatedAndCommented} from '../view/film-card-top-rated';
// import {createFilmCardMostCommented} from '../view/film-card-most-commented';
import {createFilmListButtonTemplate} from '../view/film-show-more-button';
import {siteMenuMock} from '../mock/create-site-menu-mock';
import {createFilmPopupDetails} from '../view/film-popup-details';
import {filmData} from '../mock/create-1-film';


export const renderData = (data, siteHeader, siteMainElement, footerStats) => {
  render(siteHeader, createUserStatusTemplate(), 'beforeend');
  render(siteMainElement, createSiteMenuTemplate(siteMenuMock), 'beforeend');
  render(siteMainElement, createFilmFilterTemplate(), 'beforeend');
  render(siteMainElement, createFilmCardTemplate(), 'beforeend');
  render(siteMainElement, createFilmListButtonTemplate(), 'beforeend');
  render(siteMainElement, createFilmCardTopRatedAndCommented({}), 'beforeend');
  render(siteMainElement, createFilmPopupDetails(filmData), 'beforeend');
  render(footerStats, createFooterStatsTemplate(), 'beforeend');
};
