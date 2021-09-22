export class EventManager {
  constructor(){
    this._observers = [];
  }

  subscribe(observer){
    this._observers.push(observer);
  }

  // unsubscribe(observer){
  //   const index = this._observers.findIndex((item)=>item === observer);
  //   if(index<0){
  //     return;
  //   }
  //   this._observers = [
  //     ...this._observers.slice(0,index),
  //     ...this._observers.slice(index+1),
  //   ];
  // }

  notify(context){
    this._observers.forEach((observer)=>observer(context));
  }
}
