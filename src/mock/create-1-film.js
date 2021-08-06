import {createUserDetails} from './create-user-details';
import {createFilmInfo} from './create-film-info';
import {createCommentMock} from './create-comment-mock';

export const create1Film = (index) => ({
  id: index,
  comments: createCommentMock(),
  filmInfo: createFilmInfo(),
  userDetails: createUserDetails(index),
});
export const filmData = createFilmInfo();
