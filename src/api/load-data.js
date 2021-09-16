import {
  create15Films
} from '../mock/create-15-films';

export const loadData = () => new Promise((resolve) => {
  setTimeout(() => {
    const filmsModel = create15Films();
    resolve(filmsModel);
  }, 1000);
});
