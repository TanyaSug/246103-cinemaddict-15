import Abstract from '../abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    if (new.target === Smart) {
      throw new Error('Can\'t instantiate Smart, only concrete one.');
    }
    this._data = {};
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
}

