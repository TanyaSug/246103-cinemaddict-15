import {renderElement, RenderPosition} from './render';
import UserStatusView from '../view/user-status';
import SiteMenuView from '../view/site-menu';
import FilmFilterView from '../view/film-filter';
import FilmListContainerView from '../view/film/film-list-container';
import ShowMoreButtonView from '../view/film-show-more-button';
import FilmCardTopRatedAndCommentedView from '../view/film/film-card-top-rated';
import FooterStatisticsView from '../view/footer-statistics';
import {countUserDetails} from './counters-reducer';


export const renderData = ({data, siteHeader, siteMainElement, footerStats, onFilmSelect}) => {
  const counters = data.reduce(countUserDetails, {watchlistCount: 0, historyCount: 0, favoritesCount: 0});
  renderElement(siteHeader, new UserStatusView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new SiteMenuView(counters).getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmFilterView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmListContainerView({data, onSelect: onFilmSelect}).getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new ShowMoreButtonView({data, onSelect: onFilmSelect}).getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmCardTopRatedAndCommentedView().getElement(), RenderPosition.BEFOREEND);
  renderElement(footerStats, new FooterStatisticsView().getElement(), RenderPosition.BEFOREEND);
};

