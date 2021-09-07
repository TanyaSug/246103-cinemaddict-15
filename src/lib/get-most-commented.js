import { getSortedByCommentsCount } from '../utils';

export const getMostCommented = (films) => films.slice().sort(getSortedByCommentsCount).slice(0,2);
