import {
  getRandomElement,
  getRandomInteger
} from '../utils';

const namesM = ['James', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara'];
const namesF = ['Mary', 'Robert', 'John', 'Michael', 'William', '', 'David'];
const paras = [
  'Список комментариев к фильму и форма добавления нового комментария доступны в попапе. Комментарии загружаются при открытии попапа.',
  'Для добавления нового комментария пользователь заполняет текст комментария и выбирает эмоцию (один вариант из: smile, sleeping, puke',
  'Пользователь может удалить произвольный комментарий. Комментарий удаляется нажатием на кнопку «Delete», ',
  'Одновременно может быть открыт только один попап. При открытии нового попапа прежний закрывается',
];
const emots = ['smile', 'sleeping', 'puke', 'angry'];
export const mockComments = (filmsId) => Array(getRandomInteger(0, 7)).fill().map((_, idx) => ({
  id: filmsId * 10000 + idx,
  author: `${getRandomElement(namesM)} ${getRandomElement(namesF)}`,
  comment: getRandomElement(paras),
  date: new Date(2021 - getRandomElement(0, 5), getRandomInteger(0, 11), getRandomInteger(1, 30)).toISOString(),
  emotion: getRandomElement(emots),
}));
