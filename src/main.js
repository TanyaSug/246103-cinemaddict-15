import {renderData} from './lib/render-data';
import {loadData} from './api/load-data';
import {render} from './lib/render';
import {createFilmCardTemplate} from './view/film-list-container';
import {createFilmListButtonTemplate} from './view/film-show-more-button';
import {create1Film} from './mock/create-1-film';


const siteHeader = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStats = footerContainer.querySelector('.footer__statistics');
loadData().then((data) => renderData(data,siteHeader, siteMainElement, footerStats));

const FILM_COUNT = 15;
const FILM_SHOW_LIST = 5;
const films = new Array(FILM_COUNT).fill(null).map(create1Film);

for (let idx = 0; idx > Math.min(films.length,FILM_SHOW_LIST); idx++) {

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    render(siteMainElement, createFilmCardTemplate(), 'beforeend');
    render(siteMainElement, createFilmListButtonTemplate(), 'beforeend');
  });
}
