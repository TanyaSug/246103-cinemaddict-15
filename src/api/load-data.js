import {create1520Films} from '../mock/create-15-20-films';

export const loadData = async () => {
  const data = create1520Films();
  return new Promise((resolve) => {
    resolve(data);
  });
};
