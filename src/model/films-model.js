import AbstractObserver from '../abstract-observer';

export default class FilmsModel extends AbstractObserver {

  constructor() {
    super();
    this._films = undefined;
    this._comments = new Map();
  }

  get films() {
    return this._films;
  }

  get comments() {
    return this._comments;
  }

  set films(films) {
    if (Array.isArray(films)) {
      this._films = films.slice();
    } else {
      this._films = undefined;
    }
  }

  setFilms(updateType, films) {
    if (Array.isArray(films)) {
      this._films = films.slice();
      this._notify(updateType);
    } else {
      this._films = undefined;
    }
  }

  get length() {
    if (Array.isArray(this._films)) {
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
  }

  deleteComment(updateType, id) {

    if (!this._comments.has(id)) {
      throw new Error('Can\'t delete un-existing comment');
    }
    this._comments.delete(id);
  }

  static adaptToClient(film) {
    return Object.assign(
      {},
      {
        id: film.id,
        comments: film.comments,
        filmInfo: {
          title: film.film_info.title,
          alternativeTitle: film.film_info.alternative_title,
          poster: film.film_info.poster,
          director: film.film_info.director,
          description: film.film_info.description,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          genres: film.film_info.genre,
          release: {
            date: new Date(film.film_info.release.date),
            releaseCountry: film.film_info.release.release_country,
          },
          runtime: film.film_info.runtime,
          totalRating: film.film_info.total_rating,
          ageRating: film.film_info.age_rating,
        },
        userDetails: {
          watchlist: film.user_details.watchlist,
          alreadyWatched: film.user_details.already_watched,
          favorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date !== null ?
            new Date(film.user_details.watching_date) : film.user_details.watching_date,
        },
      },
    );
  }

  static adaptToServer(film) {
    return Object.assign(
      {},
      {
        'id': film.id,
        'comments': film.comments,
        'film_info': {
          'title': film.filmInfo.title,
          'alternative_title': film.filmInfo.alternativeTitle,
          'poster': film.filmInfo.poster,
          'director': film.filmInfo.director,
          'description': film.filmInfo.description,
          'writers': film.filmInfo.writers,
          'actors': film.filmInfo.actors,
          'genre': film.filmInfo.genres,
          'release': {
            'date': film.filmInfo.release.date.toISOString(),
            'release_country': film.filmInfo.release.releaseCountry,
          },
          'runtime': film.filmInfo.runtime,
          'total_rating': film.filmInfo.totalRating,
          'age_rating': film.filmInfo.ageRating,
        },
        'user_details': {
          'watchlist': film.userDetails.watchlist,
          'already_watched': film.userDetails.alreadyWatched,
          'favorite': film.userDetails.favorite,
          'watching_date': film.userDetails.watchingDate instanceof Date ?
            film.userDetails.watchingDate.toISOString() : null,
        },
      },
    );
  }

  static adaptCommentToClient(comment) {
    return Object.assign(
      {},
      comment,
      {
        date: new Date(comment.date),
      },
    );
  }
}
