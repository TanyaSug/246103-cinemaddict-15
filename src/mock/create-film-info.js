import {generateDirector, generateFilmTitle, generateWriters, generateActors, generateReleaseCountry, generateGenres, generateFilmDescription, generateRuntime} from './film-card-mock';
import {getRandomInteger} from '../utils';

export const createFilmInfo = () => ({
  title: generateFilmTitle(),
  alternativeTitle: generateFilmTitle(),
  totalRating: getRandomInteger(1, 10),
  poster: 'images/posters/blue-blazes.jpg',
  ageRating: getRandomInteger(1, 10),
  director: generateDirector(),
  writers: generateWriters(),
  actors: generateActors(),
  release: {
    'date': new Date().toISOString(),
    'releaseCountry': generateReleaseCountry(),
  },
  runtime: generateRuntime(),
  genre: generateGenres(),
  description: generateFilmDescription(),
});
console.log(createFilmInfo());
