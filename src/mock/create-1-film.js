import {createUserDetails} from './create-user-details';
import {createFilmInfo} from './create-film-info';

export const create1Film = (index) => ({
  id: index,
  comments: [],
  filmInfo: createFilmInfo(),
  userDetails: createUserDetails(index),
});
