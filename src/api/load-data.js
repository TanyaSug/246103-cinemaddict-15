import {create15Films} from '../mock/create-15-films';

export const loadData = async () => {
  const data = create15Films();
  return new Promise((resolve) => {
    resolve(data);
  });
};
