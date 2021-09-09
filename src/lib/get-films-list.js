import {FILM_LIST_PAGE_SIZE } from './consts';

export const getFilmsList = (films, startIndex = 0, count = FILM_LIST_PAGE_SIZE ) =>
  films.slice(startIndex, startIndex + count);
