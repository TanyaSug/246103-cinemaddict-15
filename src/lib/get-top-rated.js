import { getSortedByRating } from '../utils';

export const getTopRated = (films) => films.slice().sort(getSortedByRating).slice(0,2);
