import { Observable } from 'rxjs';

var obs = new Observable((observer) => {
  console.log('Erzeugerfunktion');
  // cold = erzeugt innerhalb des Observables / ohne äußeren Anlass
  observer.next(Math.random());
});

obs.subscribe(val => console.log(val));
obs.subscribe(val => console.log(val));

// siehe auch Subject: subjects/splitstream.ts