import {UserRating, UserRatingLimit} from './consts';


const computeSafe = (data) => {
  if(!Array.isArray(data)) {
    return 0;
  }
  return data.reduce((acc, element) => {
    acc += element.userDetails.alreadyWatched ? 1 : 0;
    return acc;
  }, 0);
};

export const computeUserRating = (data) => {
  const totalWatched = computeSafe(data);
  switch(true) {
    case totalWatched <= UserRatingLimit.NONE : return UserRating.NONE;
    case totalWatched <= UserRatingLimit.NOVICE : return UserRating.NOVICE;
    case totalWatched <= UserRatingLimit.FAN : return UserRating.FAN;
    default: return UserRating.MOVIE_BUFF;
  }
};
