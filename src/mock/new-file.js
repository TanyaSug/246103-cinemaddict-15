const setWatched = () => undefined;

const setWatchList = () => undefined;

const setFavorite = () => undefined;

const resetWatched = () => undefined;

const resetWatchList = () => undefined;

const resetFavorite = () => undefined;

const handler = (param) => {
  if(param === watched) {
    if(f.watched) {
      resetWatched();
    } else {
      setWatched();
    }
  }
  if(param === watchList) {}
  if(param === favorit) {
}

  const installHandlers = () => {
  w.addEventListener('click', () => handler(watched));
  }
}
