import {getTopRated} from './get-top-rated';
import {getMostCommented} from './get-most-commented';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY:'history',
  FAVORITES: 'favorites',
  STATS:'stats',
};

export const SortType = {
  BY_DEFAULT: 'default',
  BY_DATE: 'date',
  BY_RATING: 'rating',
};

export const UserRating = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export const UserRatingLimits = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
};

export const FilmClickIds = {
  POP_UP: 0,
  WATCHED: 1,
  FAVORITES: 2,
  WATCH_LIST: 3,
};

export const filmsStartIndex = 0;

export const FILM_LIST_PAGE_SIZE  = 5;

export const DESCRIPTION_LENGTH = 140;

export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const TOP_RATED = 'Top Rated';
const MOST_COMMENTED = 'Most Commented';

export const Extra = {
  topRated: {
    heading: TOP_RATED,
    filter: (data) => getTopRated(data),
  },
  mostCommented: {
    heading: MOST_COMMENTED,
    filter: (data) => getMostCommented(data),
  },
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  COMMENT: 'COMMENT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const StatsType = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic k92Dz15RmsQ09';
export const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
