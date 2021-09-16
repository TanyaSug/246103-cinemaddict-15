import AbstractObserver from '../abstract-observer';
import {
  UpdateType,
  UserAction
} from '../lib/consts';
import {
  replaceAt
} from '../lib/replace-by-id';

export default class FilmsModel extends AbstractObserver {

  /**
   *
   * @param {Api} api интерфейс взаимодействия с сервером
   */
  constructor(api) {
    super();
    this._api = api;
    this._films = undefined;
    this._comments = new Map();
    this._busy = false;
    this._commentStatuses = new Map();
    this._filmsBusy = new Map();
  }

  async _withCommentsBusy(commentsId, userAction, callback) {
    const flag = this._comments.get(commentsId);
    if(flag){
      return;
    }
    this._commentStatuses.set(commentsId, userAction);

    try {
      this._notify(UpdateType.PATCH, commentsId);
      await this._withLogError(callback);
    } finally {
      this._commentStatuses.delete(commentsId);
      this._notify(UpdateType.PATCH, commentsId);
    }
  }

  async _withFilmBusy(filmId, callback) {
    const flag = this._filmsBusy.get(filmId);
    if(flag){
      return;
    }
    this._filmsBusy.set(filmId, true);
    try {
      this._notify(UpdateType.MINOR, filmId);
      await this._withLogError(callback);
    } finally {
      this._filmsBusy.delete(filmId);
      this._notify(UpdateType.MINOR, filmId);
    }
  }

  async _withListBusy(callback) {
    if(this._busy){
      return;
    }
    this._busy = true;
    try {
      this._notify(UpdateType.MAJOR);
      await this._withLogError(callback);
    } finally {
      this._busy = false;
      this._notify(UpdateType.MAJOR);
    }
  }

  async _withLogError(callback) {
    try {
      await callback();
    } catch (err) {
      window['console'].error(err);
    }
  }

  _getFilmIndex(filmId) {
    const index = this._films.findIndex((film) => film.id === filmId);

    if (index === -1) {
      throw new Error(`film with id ${filmId} is not on the list`);
    }
    return index;
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

  async _beginLoadData() {
    this._withListBusy(
      async () => this._onDataReceived(await this._api.loadData()),
    );
  }

  async _beginLoadComments(filmId) {
    this._withCommentsBusy(
      null,
      async () => this._updateFilmCommentsIds(await this._api.loadComments(filmId)),
    );
  }

  get films() {
    if (!Array.isArray(this._films)) {
      this._beginLoadData();
    }
    return this._films;
  }

  updateFilm(update) {
    this._withFilmBusy(
      update.id,
      async () => {
        const index = this._getFilmIndex(update.id);
        const fromServer = await this._api.updateFilm(update);
        this._films = replaceAt(this._films, fromServer, index);
      },
    );
  }

  getComments(filmId) {
    const comments = this._comments.get(filmId);
    if (!comments) {
      this._beginLoadComments(filmId);
    }
    return comments;
  }

  addComment(filmId, update) {
    this._withCommentsBusy(
      update.id,
      UserAction.ADD_COMMENT,
      async () => {
        const index = this._getFilmIndex(filmId);
        const {
          movie,
          comments,
        } = await this._api.postComment(filmId, update);
        this._films = replaceAt(this._films, movie, index);
        this._comments.set(filmId, comments);
      },
    );
  }

  deleteComment(filmId, commentId) {
    this._withCommentsBusy(
      commentId,
      UserAction.DELETE_COMMENT,
      async () => {
        const array = this._comments.get(filmId);
        if (!Array.isArray(array)) {
          return;
        }
        const index = array.findIndex((comm) => commentId === comm.id);
        if (index < 0) {
          throw new Error(`there is no comment ${commentId} on film ${filmId}`);
        }
        await this._api.deleteComment(commentId);
        this._comments.set(filmId, [...array.slice(0, index), ...array.slice(index + 1)]);
      },
    );
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
