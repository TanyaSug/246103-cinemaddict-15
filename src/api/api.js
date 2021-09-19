import {
  mockComment1,
  mockComments
} from '../mock/mock-comments';
import {
  loadData
} from './load-data';


export class Api {
  loadData() {
    return loadData();
  }

  updateFilm(film) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(film);
      }, 800);
    });
  }

  loadComments(filmId) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockComments(filmId)), 700);
    });
  }

  postComment(filmId, comment) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockComment1(filmId, 0),
          ...comment,
        });
      }, 800);
    });
  }

  deleteComment(commentId) {
    return new Promise((resolve) => {
      setTimeout(resolve({
        commentId,
      }), 800);
    });
  }
}
