import { Observable, Subject, of, from } from 'rxjs';
import { take, map, filter, tap } from 'rxjs/operators';

var obs =
  from([2, 3, 4])
  .pipe(tap(i => console.log(` Input value = ${i} `)))
  .pipe(map((d: number) => d * 2))
  .pipe(tap(i => console.log(` Output value = ${i} `)));

obs.subscribe(); 
