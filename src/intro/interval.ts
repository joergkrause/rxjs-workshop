import { Observable, Subject, of, interval } from 'rxjs';
import { take, map, filter, tap } from 'rxjs/operators';

var obs = interval(500)
  .pipe(take(5))
  .pipe(tap(i => console.log(i)));

obs.subscribe(); 
