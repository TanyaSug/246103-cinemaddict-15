import {UserRating, UserRatingLimits} from './consts';

export const computeUserRating = (data) => {
  const totalWatched = data.reduce((acc, element) => {
    acc += element.userDetails.alreadyWatched ? 1 : 0;
    return acc;
  }, 0);
  switch(true) {
    case totalWatched <= UserRatingLimits.NONE : return UserRating.NONE;
    case totalWatched <= UserRatingLimits.NOVICE : return UserRating.NOVICE;
    case totalWatched <= UserRatingLimits.FAN : return UserRating.FAN;
    default: return UserRating.MOVIE_BUFF;
  }
};
