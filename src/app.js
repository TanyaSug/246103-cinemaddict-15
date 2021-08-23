import { FilterNames, SortNames } from "./lib/consts";
import { getRandomInteger } from "./utils";

export class App{
  constructor(container){
    this._container = container;
    this._data = null;
    this._authorization = `random-auth${getRandomInteger(1000000,10000000)}`;
    this._filter = FilterNames.ALL;
    this._sort = SortNames.BY_DEFAULT;
  }

  execute(){
    this._beginLoadData();
    this._renderData();
  }

  _beginLoadData(){
    
  }
}