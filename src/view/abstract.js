import {createElement} from '../lib/render';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement(this.getTemplate());
    }
    return this._element;
  }

  // attachEvents(element) {}
  //
  // dataBind(element) {}

  _createElement() {
    const template = this.getTemplate();
    const element = createElement(template);
    this._initializeElement(element);
    return element;
  }

  _initializeElement() {
    // attachEvents(element);
    // dataBind(element);
  }

  removeElement() {
    this._element = null;
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateElement() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parentElement.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }
}
