import {FilterType} from './consts';


const safeArray = (films) => Array.isArray(films) ? films : [];

export const filter = {
  [FilterType.ALL]: (films) => safeArray(films).slice(),
  [FilterType.WATCHLIST]: (films) => safeArray(films).filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => safeArray(films).filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => safeArray(films).filter((film) => film.userDetails.favorite),
};
