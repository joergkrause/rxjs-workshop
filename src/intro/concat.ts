import { of } from 'rxjs';
import { concatWith, tap } from 'rxjs/operators';

const obs1 = of(1, 2, 3);
const obs2 = of(4, 5, 6);

var obs = 
  obs1.pipe(concatWith(obs2))
  .pipe(tap(i => console.log(` Output value = ${i} `)))

obs.subscribe(); 
