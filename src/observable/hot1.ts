import { Observable, share } from 'rxjs';

const r = Math.random();

var obs = new Observable((observer) => {
  console.log('Erzeugerfunktion');
  // cold = erzeugt innerhalb des Observables / ohne äußeren Anlass
  observer.next(Math.random());
}).pipe(share());

obs.subscribe(val => console.log(val));
obs.subscribe(val => console.log(val));