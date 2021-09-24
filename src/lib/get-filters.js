import {FilterType} from './consts';

const getSafeArray = (films) => Array.isArray(films) ? films : [];

export const filter = {
  [FilterType.ALL]: (films) => getSafeArray(films).slice(),
  [FilterType.WATCHLIST]: (films) => getSafeArray(films).filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => getSafeArray(films).filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => getSafeArray(films).filter((film) => film.userDetails.favorite),
};
