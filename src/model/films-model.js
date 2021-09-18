import AbstractObserver from '../abstract-observer';

export default class FilmsModel extends AbstractObserver {

  constructor() {
    super();
    this._films = undefined;
    this._comments = new Map();
    this._busy = false;
    this._commentStatuses = new Map();
  }

  get films() {
    return this._films;
  }

  get comments() {
    return this._comments;
  }

  set films(films) {
    if(Array.isArray(films)) {
      this._films = films.slice();
    } else {
      this._films = undefined;
    }
  }


  get length() {
    if(Array.isArray(this._films)) {
      return this._films.length;
    } else {
      return 0;
    }
  }

  updateFilm(updateType, update) {
    const index = this._films
      .findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexistent film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  getComments(filmId) {
    return this._comments.get(filmId);
  }

  setComments(comments) {
    comments.forEach((comment) => {
      this._comments.set(comment.id, comment);
    });
  }

  addComment(updateType, update) {
    this._comments.set(update.id, update);

    // this._notify(updateType, update);
  }

  deleteComment(updateType, id) {

    if (!this._comments.has(id)) {
      throw new Error('Can\'t delete un-existing comment');
    }
    this._comments.delete(id);
    // this._notify(updateType, update);
  }

  getBusy() {
    return this._busy;
  }

  getCommentStatus(commentId) {
    return this._commentStatuses.get(commentId);
  }
}

// comment add and delete
// commentList ready
// userDetails flags
// filmList ready
//
