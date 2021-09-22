import dayjs from 'dayjs';

const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
};

const compareRating = (ratingA, ratingB) => {
  const weight = getWeightForNullData(ratingA, ratingB);
  if(weight !== null) {
    return weight;
  }
  return ratingB - ratingA;
};

const compareFilmInfo = (infoA, infoB) => {
  const weight = getWeightForNullData(infoA, infoB);
  if(weight !== null) {
    return weight;
  }
  return compareRating(infoA.totalRating, infoB.totalRating);
};

export const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullData(filmA, filmB);
  if(weight !== null) {
    return weight;
  }
  return compareFilmInfo(filmA.filmInfo, filmB.filmInfo);
};

export const sortByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

export const computeTotalFilms = (films) => Array.isArray(films) ? films.length : 0;
