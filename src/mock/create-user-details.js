export const createUserDetails = (index) => ({
  watchlist: (index % 2) === 0,
  alreadyWatched: (index % 3) === 0,
  watchingDate: new Date().toISOString(),
  favorite: (index % 7) === 0,
});
