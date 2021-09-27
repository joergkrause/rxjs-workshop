import { ObservableInput, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

const obs1 = of(1, 2, 3);
const obs2 = of(4, 5, 6);

var obs =
  // kombiniert Streams mit einer Verbindungsfunktion
  // Ausgabe: 1*4, 1*5, 1*6, 2*4, 2*5, 2*6 usw.
  obs1.pipe(concatMap<number, ObservableInput<number>>(item => obs2.pipe(map(o2 => o2 * item))))
  .pipe(tap(i => console.log(` Output value = ${i} `)))

obs.subscribe(); 
