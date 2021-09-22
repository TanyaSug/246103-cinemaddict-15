import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import {StatsType} from './consts';
dayjs.extend(isBetween);

export  const getGenreUniq = (genres) => [...new Set(genres)];

export const getGenresRanks = (films) => {
  const filmGenres = films.map((film) => film.filmInfo.genres);
  const merged = [].concat(...filmGenres);
  const uniqGenres = getGenreUniq(merged);
  const ranks = {};
  uniqGenres.forEach((genre) => {ranks[genre] = 0;});
  films.forEach((film) => {
    if (film.filmInfo.genres && film.filmInfo.genres.length > 0) {
      film.filmInfo.genres.forEach((genre) => {
        if (uniqGenres.includes(genre)) {
          ranks[genre] += 1;
        }
      });
    }
  });
  return ranks;
};

export const  getFilmsByFilter = (films, currentFilter) => {
  const currentDate = new Date();
  const weekAgoDate = dayjs().subtract(7, 'day').toDate();
  const monthAgoDate = dayjs().subtract(1, 'month').toDate();
  const yearAgoDate = dayjs().subtract(1, 'year').toDate();
  let watchedFilms = [];

  switch (currentFilter) {
    case StatsType.ALL_TIME:
      watchedFilms = films
        .filter((film) => film.userDetails.alreadyWatched);
      break;

    case StatsType.TODAY:
      watchedFilms = films
        .filter((film) => film.userDetails.alreadyWatched && dayjs(film.userDetails.watchingDate).isSame(currentDate, 'day'));
      break;

    case StatsType.WEEK:
      watchedFilms = films
        .filter((film) => film.userDetails.alreadyWatched && dayjs(film.userDetails.watchingDate).isBetween(weekAgoDate, currentDate));
      break;

    case StatsType.MONTH:
      watchedFilms = films
        .filter((film) => film.userDetails.alreadyWatched && dayjs(film.userDetails.watchingDate).isBetween(monthAgoDate, currentDate));
      break;

    case StatsType.YEAR:
      watchedFilms = films
        .filter((film) => film.userDetails.alreadyWatched && dayjs(film.userDetails.watchingDate).isBetween(yearAgoDate, currentDate));
      break;
  }
  return watchedFilms;
};

