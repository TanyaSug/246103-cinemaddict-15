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

export const UserRatingLimit = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
};

export const FilmClickId = {
  POP_UP: 0,
  WATCHED: 1,
  FAVORITES: 2,
  WATCH_LIST: 3,
};

export const USER_STATUS_COMPONENT = '_userStatusComponent';

export const FILMS_LOADING = '_filmsLoading';

export const FILM_LIST_EMPTY_COMPONENT = '_filmListEmptyComponent';

export const FILM_STATISTIC = '_filmStatistic';

export const FOOTER_STATISTICS_COMPONENT = '_footerStatisticsComponent';

export const FILMS_PRESENTER = '_filmsPresenter';

export const FILTER_PRESENTER = '_filterPresenter';

export const MAIN_FILMS_CONTAINER = '_mainFilmsContainer';

export const FILMS_SORT_COMPONENT = '_filmsSortComponent';

export const ANIMATION_DELAY = 1000;

export const HOURS_DURATION = 60;

export const ENTER = 'Enter';

export const BUTTON_NAME = 'Delete';

export const BUTTON_NAME_DELETING = 'Deleting...';

export  const BUTTON_LABEL = 'Show more';

export const FILM_LIST_PAGE_SIZE  = 5;

export const DESCRIPTION_LENGTH = 140;

export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

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

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic k92Dz15RmsQ09';
export const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
