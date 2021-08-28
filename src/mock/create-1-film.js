import {createUserDetails} from './create-user-details';
import {createFilmInfo} from './create-film-info';
import {createCommentMock} from './create-comment-mock';
import {nanoid} from 'nanoid';

export const create1Film = (index) => ({
  id: nanoid(),
  filmInfo: createFilmInfo(),
  userDetails: createUserDetails(index),
  comments: createCommentMock(),
});
export const filmData = createFilmInfo();

