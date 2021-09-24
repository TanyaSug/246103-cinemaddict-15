import {createElement} from '../lib/render';
import {ANIMATION_DELAY} from '../lib/consts';

const SHAKE_ANIMATION_TIMEOUT = 600;

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

  _createElement() {
    const template = this.getTemplate();
    const element = createElement(template);
    return element;
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

  shake(handler) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / ANIMATION_DELAY}s`;

    setTimeout(() => {
      this.getElement().style.animation = '';
      handler();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
