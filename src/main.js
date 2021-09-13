import MainPresenter from './presenter/main-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
// import {create15Films} from './mock/create-15-films';
// import {loadData} from './api/load-data';

// const films = create15Films();
const bodyContainer = document.querySelector('body');
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
// filmsModel.setFilms(films);

const presenter = new MainPresenter(bodyContainer, filmsModel, filterModel);
presenter.execute();


