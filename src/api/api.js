import FilmsModel from '../model/films-model';
import {RequestMethod} from '../lib/consts';


const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({
    url,
    method = RequestMethod.GET,
    body = null,
    headers = new Headers()}) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  getFilms() {
    return this._load({url: 'movies'})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: RequestMethod.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  static catchError(err) {
    throw err;
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(FilmsModel.adaptCommentToClient));
  }

  addComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: RequestMethod.POST,
      body: JSON.stringify(FilmsModel.adaptCommentToClient(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((response) => Object.assign(
        {},
        {
          film: FilmsModel.adaptToClient(response.movie),
          comments: response.comments.map(FilmsModel.adaptCommentToClient),
        },
      ));
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: RequestMethod.DELETE,
    });
  }
}
