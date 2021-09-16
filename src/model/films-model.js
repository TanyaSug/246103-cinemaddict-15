import AbstractObserver from '../abstract-observer';
import {
  loadData
} from '../api/load-data';
import {
  UpdateType
} from '../lib/consts';
import {
  replaceAt
} from '../lib/replace-by-id';
import {
  mockComments
} from '../mock/mock-comments';

export default class FilmsModel extends AbstractObserver {

  constructor() {
    super();
    this._films = undefined;
    this._comments = new Map();
    this._busy = false;
    this._commentStatuses = new Map();
  }

  _onDataReceived(films) {
    this._films = films;
    this._notify(UpdateType.MAJOR, undefined);
  }

  _updateFilmCommentsIds(filmId, commentIds) {
    if (!Array.isArray(this._films)) {
      return;
    }
    const filmIndex = this._films.findIndex((film) => film.id === filmId);
    if (filmIndex < 0) {
      return;
    }
    const found = this._films[filmIndex];
    found.comments = commentIds;
    this.films = replaceAt(this._films, found, filmIndex);
  }

  _onCommentsReceived(filmId, comments) {
    this._updateFilmCommentsIds(filmId, comments.map((comment) => comment.id));
    this.comment.set(filmId, comments);
    this._notify(UpdateType.MINOR, filmId);
  }

  _beginLoadData() {
    loadData().then((films) => {
      this._onDataReceived(films);
    }).catch((err) => window['console'].error(err));
  }

  _beginLoadComments(filmId) {
    setTimeout(() => this._updateFilmCommentsIds(filmId, mockComments(filmId)), 700);
  }

  get films() {
    if (!Array.isArray(this._films)) {
      this._beginLoadData();
    }
    return this._films;
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
    const comments = this._comments.get(filmId);
    if (!comments) {
      this._beginLoadComments(filmId);
    }
    return comments;
  }

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._comments
      .findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType, update);
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
