import {create15Films} from '../mock/create-15-films';
import {createCommentMock} from '../mock/create-comment-mock';

export const loadData = async () => {
  const filmsModel = create15Films();
  return new Promise((resolve) => {
    resolve(filmsModel);
  });
};

export const loadComments = async (ids) => {
  const comments = createCommentMock().filter((comment) => ids.includes(comment.id));
  return new Promise((resolve) => {
    resolve(comments);
  });
};
