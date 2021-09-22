export class EventManager {
  constructor(){
    this._observers = [];
  }

  subscribe(observer){
    this._observers.push(observer);
  }

  notify(context){
    this._observers.forEach((observer)=>observer(context));
  }
}
