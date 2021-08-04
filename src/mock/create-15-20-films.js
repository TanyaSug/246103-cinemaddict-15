import {create1Film} from './create-1-film';

export const create1520Films = (count = 15) => {
  const result = Array(count);
  return result.fill(null).map((_value, index) => create1Film(index));
};
