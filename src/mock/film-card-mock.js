import {getRandomInteger} from '../utils';

// const filmCardData = {
//   title:,
//   alternativeTitle,
//   poster:,
//   totalRating:,
//   genre:,
//   release: {
//     date:,
//     country:,
//   },
//   ageRating:,
//   director:,
//   actors:,
//   runtime:,
//   description:,
//   userDetails: {
//     watchlist:,
//     alreadyWatched:,
//     watchingRate:,
//     favorite:,
//   },
//    comments:[];
// };
// const comment {
//     id:,
//     author:,
//     comment:,
//     date:,
//     emotion:,
//   };

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
  console.log(title[randomIndex]);
  return title[randomIndex];
};
const generateFilmDescription = () => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  return description.trim()
    .split('.')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};
console.log(generateFilmDescription());

export const generateFilmCardInfo = () => ({
  title: generateFilmTitle(),
//     poster:,
//     rating:,
//     genre:,
//     release: {
//       date:,
//       releaseCountry:,
// },
//   runtime:,
//   description:,
//   comment:,
//   userDetails: {
//     watchlist:,
//     alreadyWatched:,
//     watchingRate:,
//     favorite:,
//   },
});
