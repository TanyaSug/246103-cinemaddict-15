export const replaceAt = (array, freshItem, index) => {
  if (index < 0) {
    return array;
  }
  return [
    ...array.slice(0, index),
    freshItem,
    ...array.slice(index + 1),
  ];
};
export const replaceById = (array, freshItem, keyName = 'id') => {
  if (!Array.isArray(array)) {
    return array;
  }
  const {
    [keyName]: id,
  } = freshItem;
  const index = array.findIndex((item) => item[keyName] === id);
  return replaceAt(array, freshItem, index);
};
