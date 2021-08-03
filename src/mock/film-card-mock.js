const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const filmCardInfo = {
  title:,
  poster:,
  rating:,
  genre:,
  release: {
    date:,
    releaseCountry:,
  },
  ageRating:,
  director:,
  actors:,
  runtime:,
  description:,
  comment:,
  userDetails: {
    watchlist:,
    alreadyWatched:,
    watchingRate:,
    favorite:,
  },
};

const generateFilmTitle = () => {
  const title = [
    'The Lord of the Rings: The Return of the King',
    'The Dark Knight',
    'Avatar',
    'Ice Age: Dawn of the Dinosaurs',
    'The Da Vinci Code',
    'The Twilight Saga: New Moon',
  ];
  const randomIndex = getRandomInteger(0, title.length - 1);
  return title[randomIndex];
};
const generateFilmDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
};
const generateFilmCard = () => {
  return {
    title: generateFilmTitle(),
    poster:,
    rating:,
    genre:,
    release: {
      date:,
      releaseCountry:,
},
  runtime:,
  description:,
  comment:,
  userDetails: {
    watchlist:,
    alreadyWatched:,
    watchingRate:,
    favorite:,
  },
};
};
