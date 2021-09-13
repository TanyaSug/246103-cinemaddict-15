import SmartView from '../view/popup/smart';
import {StatsType} from '../lib/consts';
// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


const createStatsFilterElement = (filter, currentFilter) => {
  const {type, name} = filter;

  const selectedFilter = type === currentFilter ? 'checked' : '';

  return `
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${selectedFilter}>
      <label for="statistic-${type}" class="statistic__filters-label">${name}</label>
  `;
};

const createFilmStatsTemplate = (data, filters) => {
  const {userRating, watchedMovies, totalDurationInHours, totalDurationInMinutes, topGenre, currentFilter} = data;

  const filterElements = filters
    .map((filter) => createStatsFilterElement(filter, currentFilter))
    .join('');

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRating}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filterElements}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMovies} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDurationInHours} <span class="statistic__item-description">h</span> ${totalDurationInMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class FilmStatistic extends SmartView {

  getTemplate() {
    return createFilmStatsTemplate();
  }
}
