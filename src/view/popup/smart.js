import Abstract from '../abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    if (new.target === Smart) {
      throw new Error('Can\'t instantiate Smart, only concrete one.');
    }
    this._data = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateData(update, justDataUpdating = false) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (!justDataUpdating) {
      this.updateElement();
    }
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

