import { Observable } from 'rxjs';

function foo() {
  console.log('Hello Pull');
  return 42;
}

// direkter Aufruf, mehrfache Werte benötigen mehrfachen Aufruf (Pull)
const x = foo.call(this);
console.log(x);

const y = foo.call(this);
console.log(y);

// Observable, mehrfache Werte benötigen mehrfache Abonnenten (Push)
const foobs = new Observable(subscriber => {
  console.log('Hello Push');
  subscriber.next(23);
});
 
foobs.subscribe(x => {
  console.log(x);
});
foobs.subscribe(y => {
  console.log(y);
});