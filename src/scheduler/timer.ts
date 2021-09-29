import { Observable, Subject, of, timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';

console.log("Start...wait 1 sec");

var obs = timer(1000, 500)
  .pipe(take(5))
  .pipe(tap(i => console.log(i)));

obs.subscribe(); 
