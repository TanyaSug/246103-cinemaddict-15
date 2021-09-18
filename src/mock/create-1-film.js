import {createUserDetails} from './create-user-details';
import {createFilmInfo} from './create-film-info';
import {nanoid} from 'nanoid';

export const create1Film = (index) => ({
  id: nanoid(),
  filmInfo: createFilmInfo(),
  userDetails: createUserDetails(index),
  comments: [1, 2, 3],
});
export const filmData = create1Film(0);

