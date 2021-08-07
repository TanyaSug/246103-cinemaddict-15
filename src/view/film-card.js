export const filmCard = ({
  title, totalRating, releaseDate, runtime, genres, posters, description, commentsCount},
) => (
  `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres}</span>
          </p>
          <img src=${posters} alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`
);
//    ${
//   [...Array(5).fill(null)].map(filmCard).join('')
//   }
