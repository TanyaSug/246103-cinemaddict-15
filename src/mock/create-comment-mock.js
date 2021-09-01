import {getRandomElement, getRandomInteger} from '../utils';

const authors = [
  'Igor',
  'Ilya',
  'Iren',
  'Svetlana',
  'Oleg',
];

const comments = [
  'I liked it very much',
  'It is a really good film',
  'Worth to watch it',
  'I will watch this film definitely',
];

const emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const createCommentMock = () => (
  {
    id: getRandomInteger(1, 20),
    author: getRandomElement(authors),
    text: getRandomElement(comments),
    date: '2019/12/31 23:59',
    emotion: getRandomElement(emotions),
  }
);

export const getCommentsCount = () => getRandomInteger(1, 30);
