import {FILMS_COUNT} from './consts';

export const getFilmsList = (films, startIndex = 0, count = FILMS_COUNT) =>
  films.slice(startIndex, startIndex + count);
