import {getRandomInteger, getRandomElement, getRandomSubset} from '../utils';

const titles = [
  'The Lord of the Rings: The Return of the King',
  'The Dark Knight',
  'Avatar',
  'Ice Age: Dawn of the Dinosaurs',
  'The Da Vinci Code',
  'The Twilight Saga: New Moon',
];
const directors = [
  'Andrew Adamson',
  'Martin Campbell',
  'Jason Stutter',
  'Lee Tamahori',
  'Robert Sarkies',
  'April Phillips',
];
const writers = [
  'Takeshi Kitano',
  'Robert Towne',
  'Quentin Tarantino',
  'Francis Ford Coppola',
  'William Goldman',
  'Charlie Kaufman',
];
const actors = [
  'Robert De Niro',
  'Meryl Streep ',
  'Tom Hanks ',
  'Leonardo DiCaprio ',
  'Cate Blanchett',
];
const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const runtime = [
  '1h 50m',
  '1h 30m',
  '1h 20m',
  '1h 15m',
];
const genres = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
];
const releaseCountry = [
  'Russia',
  'Finland',
  'New Zealand',
  'Australia',
  'China,',
];
export const generateFilmTitle = () => getRandomElement(titles);
export const generateDirector = () => getRandomElement(directors);
export const generateWriters = () => getRandomSubset(writers, getRandomInteger(1, 3)).toString();
export const generateActors = () => getRandomSubset(actors, getRandomInteger(1, 2)).toString();
export const generateFilmDescription = () => getRandomSubset(description, getRandomInteger(1, 5)).toString();
export const generateRuntime = () => getRandomElement(runtime);
export const generateGenres = () => getRandomElement(genres);
export const generateReleaseCountry = () => getRandomElement(releaseCountry);
console.log(generateFilmDescription());
