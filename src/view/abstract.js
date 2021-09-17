import {createElement} from '../lib/render';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }
    this._element = null;
    this._callback = {};
  }

  _createElement() {
    return this.initializeElement(createElement(this.getTemplate()));
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  initializeElement(element) {
    return element;
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement();
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
