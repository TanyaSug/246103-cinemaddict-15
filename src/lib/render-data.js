import {renderElement, RenderPosition} from './render';
import UserStatusView from '../view/user-status';
import SiteMenuView from '../view/site-menu';
import FilmFilterView from '../view/film-filter';
import FilmCardView from '../view/film-list-container';
import ShowMoreButtonView from '../view/film-show-more-button';
import FilmCardTopRatedAndCommentedView from '../view/film-card-top-rated';
import {moreButtonHandler} from '../view/film-list-container';
import FooterStatisticsView from '../view/footer-statistics';
import FilmPopupCardView from '../view/film-popup-card';
// import {filmData} from '../mock/create-1-film';
// import {createFilmCardMostCommented} from '../view/film-card-most-commented';

export const renderData = (data, siteHeader, siteMainElement, footerStats) => {
  renderElement(siteHeader, new UserStatusView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new SiteMenuView({}).getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmFilterView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmCardView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);
  moreButtonHandler();
  renderElement(siteMainElement, new FilmCardTopRatedAndCommentedView().getElement(), RenderPosition.BEFOREEND);
  renderElement(footerStats, new FooterStatisticsView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmPopupCardView({}).getElement(), RenderPosition.BEFOREEND);
};
