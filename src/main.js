import MainPresenter from './presenter/main-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import Api from './api/api';
import {AUTHORIZATION, END_POINT, UpdateType} from './lib/consts';


const filmsModel = new FilmsModel();
const api = new Api(END_POINT, AUTHORIZATION);
api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
});
const bodyContainer = document.querySelector('body');

const filterModel = new FilterModel();

const presenter = new MainPresenter(bodyContainer, filmsModel, filterModel, api);
presenter.execute();


