import {
  UserRating,
  UserRatingLimits
} from './consts';

const computeSafe = (data) => {
  if (!Array.isArray(data)) {
    return 0;
  }
  return data.reduce((acc, element) => {
    acc += element.userDetails.alreadyWatched ? 1 : 0;
    return acc;
  }, 0);
};

export const computeUserRating = (data) => {
  const totalWatched = computeSafe(data);
  switch (true) {
    case totalWatched <= UserRatingLimits.NONE:
      return UserRating.NONE;
    case totalWatched <= UserRatingLimits.NOVICE:
      return UserRating.NOVICE;
    case totalWatched <= UserRatingLimits.FAN:
      return UserRating.FAN;
    default:
      return UserRating.MOVIE_BUFF;
  }
};
