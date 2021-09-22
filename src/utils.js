import dayjs from 'dayjs';

// export const getRandomInteger = (min, max) => {
//   const lower = Math.ceil(Math.min(min, max));
//   const upper = Math.floor(Math.max(min, max));
//
//   return Math.floor(lower + Math.random() * (upper - lower + 1));
// };
// export const getRandomElement = (arr) => {
//   const randomIndex = getRandomInteger(0, arr.length - 1);
//   return arr[randomIndex];
// };
// export const getRandomSubset = (arr, count) => Array(count).fill(null).map(() => getRandomElement(arr));
//
//
// export const updateItem = (items, update) => {
//   const index = items.findIndex((item) => item.id === update.id);
//
//   if (index === -1) {
//     return items;
//   }
//
//   return [
//     ...items.slice(0, index),
//     update,
//     ...items.slice(index + 1),
//   ];
// };

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

// const compareByComments = (commentsA, commentsB)=>{
//   const weight = getWeightForNullData(commentsA,commentsB);
//   if(weight !== null){
//     return weight;
//   }
//   return commentsB.length - commentsA.length;
// };

// export const getSortedByCommentsCount = (filmA, filmB)=>{
//   const weight = getWeightForNullData(filmA,filmB);
//   if(weight !== null){
//     return weight;
//   }
//   return compareByComments(filmA.comments, filmB.comments);
// };

export const sortByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

export const computeTotalFilms = (films) => Array.isArray(films) ? films.length : 0;
