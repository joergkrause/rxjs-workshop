import { Observable } from 'rxjs';

const r = Math.random();

var obs = new Observable((observer) => {
  console.log('Erzeugerfunktion');
  // cold = erzeugt innerhalb des Observables / ohne äußeren Anlass
  observer.next(r);
});

obs.subscribe(val => console.log(val));
obs.subscribe(val => console.log(val));