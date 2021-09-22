import Smart from '../view/popup/smart';
import {StatsType} from '../lib/consts';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {computeUserRating} from '../lib/compute-user-rating';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getGenresRanks} from '../lib/get-films-by-filter';
dayjs.extend(duration);

const renderChart = (statisticCtx, films) => {

  const allRanks = getGenresRanks(films);
  return new Chart(statisticCtx, {

    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(allRanks),
      datasets: [{
        data: Object.values(allRanks),
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatsFilterElement = (filter, currentFilter) => {
  const {type, name} = filter;

  const checked = type === currentFilter ? 'checked' : '';

  return `
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${checked}>
      <label for="statistic-${type}" class="statistic__filters-label">${name}</label>
  `;
};

const createFilmStatsTemplate = (films, filters, currentFilter) => {

  const userRating = computeUserRating(films);
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);
  const watchedFilmsCount = watchedFilms.length;
  const totalDuration = watchedFilms.reduce((acc, film) =>  acc + film.filmInfo.runtime, 0);

  const getFilmsHours = (minutes) => Math.floor(dayjs.duration({minutes}).asHours());
  const hoursDuration = getFilmsHours(totalDuration);
  const minutesDuration = totalDuration - (hoursDuration * 60);

  const allRanks = getGenresRanks(films);
  const sortedAllRanks = Object.keys(allRanks).map((key) => [key, allRanks[key]])
    .sort((a, b) => b[1] - a[1]);

  const topGenre = sortedAllRanks.length ? sortedAllRanks[0][0] : '';

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
        <p class="statistic__item-text">${watchedFilmsCount <= 0  ? 0 : watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hoursDuration <= 0 ? 0 : hoursDuration} <span class="statistic__item-description">h</span> ${minutesDuration === 0 ? 0 : minutesDuration} <span class="statistic__item-description">m</span></p>
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

export default class FilmStatistic extends Smart {
  constructor(filteredFilms, currentFilter) {
    super();

    this._filteredFilms = filteredFilms;
    this._filter = this._getFilter();
    this._currentFilter = currentFilter;
    this._userStatisticChart = null;

    this._filterElementChangeHandler = this._filterElementChangeHandler.bind(this);

    this._setChart();
  }

  getTemplate() {
    const filteredFilms = this._data.filteredFilms || this._filteredFilms;
    const currentFilter = this._data.currentFilter || this._currentFilter;
    return createFilmStatsTemplate(filteredFilms, this._filter, currentFilter);
  }


  _filterElementChangeHandler(evt) {
    this._callback.changeStatsFilter(evt.target.value);
  }


  setStatsFilterElementsChangeHandler(callback) {
    this._callback.changeStatsFilter = callback;

    this.getElement()
      .querySelector('.statistic__filters')
      .addEventListener('change', this._filterElementChangeHandler);
  }

  restoreHandlers() {
    this._setChart();
    this.setStatsFilterElementsChangeHandler(this._callback.changeStatsFilter);

  }

  _getFilter() {
    return [
      {
        type: StatsType.ALL_TIME,
        name: 'All time',
      },
      {
        type: StatsType.TODAY,
        name: 'Today',
      },
      {
        type: StatsType.WEEK,
        name: 'Week',
      },
      {
        type: StatsType.MONTH,
        name: 'Month',
      },
      {
        type: StatsType.YEAR,
        name: 'Year',
      },
    ];
  }

  _setChart() {
    if (this._userStatisticChart !== null) {
      this._userStatisticChart = null;
    }
    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    const films = this._data.filteredFilms || this._filteredFilms;

    this._userStatisticChart = renderChart(statisticCtx, films);
  }

  removeElement() {
    super.removeElement();

    if (this._userStatisticChart !== null) {
      this._userStatisticChart = null;
    }
  }
}
