import {getRandomInteger} from '../utils';

const createSiteMenuMock = () => ({
  watchlistCount: getRandomInteger(1, 20),
  historyCount: getRandomInteger(1, 10),
  favoritesCount: getRandomInteger(1, 15),
});
export const siteMenuMock = createSiteMenuMock();
