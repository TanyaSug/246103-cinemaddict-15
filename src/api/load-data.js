import {
  create15Films
} from '../mock/create-15-films';

export const loadData = async () => {
  const filmsModel = create15Films();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filmsModel);
    }, 1000);
  });
};
