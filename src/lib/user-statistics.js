
export  const getGenreUniq = (genres) => [...new Set(genres)];
export const countFilmsByGenre = (films, genre) =>
  films.filter((film) => film.filmInfo.genres === genre).length;

// const getWatchedFilms = (films) => {
//   // const WatchedFilms = [];
//   const WatchedFilms = films.filter((film) => film.userDetails.alreadyWatched);
//   const WatchedFilmsCount = WatchedFilms.length;
//   const totalDuration = WatchedFilms.reduce((acc, film) => acc + film.filmInfo.runtime, 0);
//
// };

export const getGenresRanks = (films) => {
  const filmGenres = films.map((film) => film.filmInfo.genres);
  const merged = [].concat(...filmGenres);
  const uniqGenres = getGenreUniq(merged);

  const ranks = {};
  uniqGenres.forEach((genre) => {ranks[genre] = 0;});

  films.forEach((film) => {
    if (film.filmInfo.genres && film.filmInfo.genres.length > 0) {
      film.filmInfo.genres.forEach((genre) => {
        if (uniqGenres.includes(genre)) {
          ranks[genre] += 1;
        }
      });
    }
  });

  return ranks;
};

