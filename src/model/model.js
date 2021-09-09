

export class Model {
  constructor() {
    this._films = undefined;
    this._comments = new Map();
    this._busy = false;
    this._commentStatuses = new Map();
  }

  getFilms() {
    return this._films;
  }

  getComments(filmId) {
    return this._comments.get(filmId);
  }

  getBusy() {
    return this._busy;
  }

  getCommentStatus(commentId) {
    return this._commentStatuses.get(commentId);
  }
}
