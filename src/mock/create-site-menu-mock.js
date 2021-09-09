import {getRandomInteger} from '../utils';

export const createSiteMenuMock = () => ({
  watchlistCount: getRandomInteger(1, 20),
  historyCount: getRandomInteger(1, 10),
  favoritesCount: getRandomInteger(1, 15),
});

