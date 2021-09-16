import {
  generateDirector,
  generateFilmPoster,
  generateFilmTitle,
  generateWriters,
  generateActors,
  generateReleaseCountry,
  generateGenres,
  generateFilmDescription,
  generateRuntime,
  generateFilmAgeRating
} from './film-card-mock';
import {getRandomInteger} from '../utils';
import {getCommentsCount} from './create-comment-mock';

export const createFilmInfo = () => ({
  title: generateFilmTitle(),
  alternativeTitle: generateFilmTitle(),
  totalRating: getRandomInteger(1, 10),
  posters: generateFilmPoster(),
  ageRating: generateFilmAgeRating(),
  director: generateDirector(),
  writers: generateWriters(),
  actors: generateActors(),
  releaseDate: new Date(2021-getRandomInteger(1,50),getRandomInteger(0,11), getRandomInteger(1,30)).toISOString(),
  releaseCountry: generateReleaseCountry(),
  runtime: generateRuntime(),
  genres: generateGenres(),
  description: generateFilmDescription(),
  commentsCount: getCommentsCount(),
});

